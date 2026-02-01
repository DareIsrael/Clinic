// FIXED: Use the correct API names
import { format } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

const CANADA_TIMEZONE = 'America/Toronto';

/**
 * Convert a date string (YYYY-MM-DD) to UTC for database storage
 * Treats the date as Canada local time
 */
export function canadaDateToUTC(dateString) {
  if (!dateString) return null;
  
  // Parse the Canada date string (YYYY-MM-DD)
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Create a date in Canada timezone at noon (to avoid DST edge cases)
  const canadaDate = new Date(year, month - 1, day, 12, 0, 0, 0);
  
  // Convert Canada time to UTC using date-fns-tz
  return fromZonedTime(canadaDate, CANADA_TIMEZONE);
}

/**
 * Convert UTC date to Canada date string (YYYY-MM-DD)
 */
export function utcToCanadaDate(utcDate) {
  if (!utcDate) return '';
  
  const date = utcDate instanceof Date ? utcDate : new Date(utcDate);
  
  // Convert UTC to Canada timezone
  const canadaDate = toZonedTime(date, CANADA_TIMEZONE);
  
  // Format as YYYY-MM-DD
  return format(canadaDate, 'yyyy-MM-dd');
}

/**
 * Format date for display in Canada timezone
 */
export function formatCanadaDate(date, formatStr = 'MMM d, yyyy') {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  // Convert UTC to Canada timezone
  const canadaDate = toZonedTime(dateObj, CANADA_TIMEZONE);
  
  return format(canadaDate, formatStr);
}

/**
 * Get today's date in Canada timezone (YYYY-MM-DD)
 */
export function getTodayCanadaDate() {
  const now = new Date();
  // Convert current UTC time to Canada timezone
  const canadaDate = toZonedTime(now, CANADA_TIMEZONE);
  return format(canadaDate, 'yyyy-MM-dd');
}

/**
 * Get future date in Canada timezone
 */
export function getFutureCanadaDate(days = 30) {
  const now = new Date();
  const future = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  // Convert UTC to Canada timezone
  const canadaDate = toZonedTime(future, CANADA_TIMEZONE);
  return format(canadaDate, 'yyyy-MM-dd');
}