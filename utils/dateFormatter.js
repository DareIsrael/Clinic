// Simple helper functions
export function formatToUTC(dateString) {
  return new Date(dateString).toISOString();
}

export function displayCanadaDate(utcDateString, options = {}) {
  const date = new Date(utcDateString);
  return date.toLocaleDateString('en-US', {
    timeZone: 'America/Toronto',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  });
}

export function displayCanadaTime(utcDateString) {
  const date = new Date(utcDateString);
  return date.toLocaleTimeString('en-US', {
    timeZone: 'America/Toronto',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getCanadaDateString(utcDateString) {
  const date = new Date(utcDateString);
  return date.toLocaleDateString('en-CA', {
    timeZone: 'America/Toronto'
  });
}