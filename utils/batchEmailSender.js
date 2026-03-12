import { sendEmail } from './emailService';

/**
 * Send emails in batches to avoid SMTP rate-limiting and server overload.
 *
 * @param {Array<{to: string, subject: string, html: string}>} emails
 * @param {Object} options
 * @param {number} [options.batchSize=5]   — emails per batch
 * @param {number} [options.delayMs=2000]  — pause between batches (ms)
 * @returns {Promise<{sent: number, failed: number, errors: string[]}>}
 */
export async function sendEmailsInBatches(emails, { batchSize = 5, delayMs = 2000 } = {}) {
    let sent = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < emails.length; i += batchSize) {
        const batch = emails.slice(i, i + batchSize);

        // Send the current batch concurrently
        const results = await Promise.allSettled(
            batch.map((mail) => sendEmail(mail))
        );

        for (const result of results) {
            if (result.status === 'fulfilled') {
                sent++;
            } else {
                failed++;
                errors.push(result.reason?.message || 'Unknown error');
                console.error('Batch email error:', result.reason?.message);
            }
        }

        // Pause between batches (skip after the last batch)
        if (i + batchSize < emails.length) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    return { sent, failed, errors };
}

/**
 * Escape HTML special characters to prevent XSS when interpolating
 * user input into email templates.
 */
export function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Validate an email address format.
 */
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
