const addressValidator = (address) => {
  if (!address || typeof address !== 'object') {
    return { valid: false, message: "Address must be a valid JSON object." };
  }

  const { street, city, state, postal_code, country } = address;
  
  const allowedFields = ["street", "city", "state", "postal_code", "country"];
  const extraFields = Object.keys(address).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0)
    return { valid: false, message: `Unexpected fields: ${extraFields.join(", ")}` };
  
  if (!street) return { valid: false, message: "Street is required." };
  if (!city) return { valid: false, message: "City is required." };
  if (!state) return { valid: false, message: "State is required." };
  if (!country) return { valid: false, message: "Country is required." };
  if (!postal_code || !/^\d{5}(-\d{4})?$/.test(postal_code)) {
    return { valid: false, message: "Postal code is invalid." };
  }

  return { valid: true };
};

export default addressValidator;
