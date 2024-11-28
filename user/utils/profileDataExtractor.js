import addressValidator from './addressValidator.js';

const getQuery = (body, userId) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    preferred_currency,
    language
  } = body;
  
  let query = 'UPDATE users SET ';
  let values = [];
  let valuesIndex = 1;
  
  const fields = {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    preferred_currency,
    language,
  };

  try {
    Object.keys(fields).forEach((key) => {
      if (fields[key]) {
        if (key === 'address') {
          const addressValidation = addressValidator(fields[key]);
          if (!addressValidation.valid) throw new Error(addressValidation.message);
          values.push(JSON.stringify(fields[key]));
        } else {
          values.push(fields[key]);
        }
        query += `${key} = $${valuesIndex}, `;
        valuesIndex++;
      }
    });
  } catch (err) {    
    return { error: err.message }
  }

  if (values.length === 0) return { error: "No valid fields provided for insertion" };
  values.push(userId);
  
  query = query.slice(0, -2);
  query += ` WHERE id = $${valuesIndex} RETURNING *`;
  
  return { query, values };
}

export default getQuery;
