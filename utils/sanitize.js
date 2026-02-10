/**
 * Input Sanitization Utilities
 * Prevents NoSQL injection and other security vulnerabilities
 */

/**
 * Sanitize search input to prevent NoSQL injection and ReDoS attacks
 * @param {string} input - User input to sanitize
 * @param {number} maxLength - Maximum allowed length (default: 100)
 * @returns {string} - Sanitized input safe for MongoDB queries
 */
export function sanitizeSearchInput(input, maxLength = 100) {
    if (!input || typeof input !== 'string') {
        return '';
    }

    // Trim whitespace
    let sanitized = input.trim();

    // Enforce maximum length to prevent ReDoS attacks
    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    // Remove special regex characters that could be exploited
    // This prevents regex injection attacks
    sanitized = sanitized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Remove MongoDB operators to prevent NoSQL injection
    // Prevents queries like: { $where: "malicious code" }
    sanitized = sanitized.replace(/\$/g, '');

    return sanitized;
}

/**
 * Validate and sanitize email input
 * @param {string} email - Email to validate
 * @returns {string|null} - Sanitized email or null if invalid
 */
export function sanitizeEmail(email) {
    if (!email || typeof email !== 'string') {
        return null;
    }

    const trimmed = email.trim().toLowerCase();

    // Basic email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(trimmed)) {
        return null;
    }

    return trimmed;
}

/**
 * Sanitize text input (names, addresses, etc.)
 * @param {string} input - Text to sanitize
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} - Sanitized text
 */
export function sanitizeTextInput(input, maxLength = 200) {
    if (!input || typeof input !== 'string') {
        return '';
    }

    let sanitized = input.trim();

    // Enforce maximum length
    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    // Remove potentially dangerous characters while keeping letters, numbers, spaces, and common punctuation
    sanitized = sanitized.replace(/[<>{}[\]\\]/g, '');

    return sanitized;
}

/**
 * Sanitize phone number input
 * @param {string} phone - Phone number to sanitize
 * @returns {string} - Sanitized phone number
 */
export function sanitizePhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') {
        return '';
    }

    // Remove all non-numeric characters except + and spaces
    return phone.replace(/[^0-9+\s()-]/g, '').trim();
}

/**
 * Validate date string format (YYYY-MM-DD)
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - True if valid format
 */
export function isValidDateFormat(dateString) {
    if (!dateString || typeof dateString !== 'string') {
        return false;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }

    // Verify it's a valid date
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}
