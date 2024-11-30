const getQuery = (body, userId) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
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
    preferred_currency,
    language,
  };

  try {
    Object.keys(fields).forEach((key) => {
      if (fields[key]) {
        values.push(fields[key]);
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
