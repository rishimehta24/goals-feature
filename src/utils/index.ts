// Utility functions can be added here
// Example: form validation, data formatting, etc.

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

export const validateForm = (formData: unknown): boolean => {
  // Add validation logic here
  return true;
};

