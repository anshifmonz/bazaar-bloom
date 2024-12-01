const validateFields = (fields) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || (key === 'amount' && (isNaN(value) || value <= 0))) {
      return `Invalid or missing "${key}". ${
        key === 'amount' ? 'Amount must be a positive number.' : `${key} must be a non-empty string.`
      }`;
    }
  }
  return null;
};

export default validateFields;
