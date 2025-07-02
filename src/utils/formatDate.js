/**
 * Format date to "Month Day, Year" (e.g., July 2, 2025)
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Format date and time to "MMM D, YYYY, HH:MM AM/PM" (e.g., Jul 2, 2025, 10:30 AM)
 */
export const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Date(dateString).toLocaleString(undefined, options);
};
