const productFiler = (req) => {
  const { search, category, maxPrice, minPrice, sort } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1'
  let values = []
  let valuesIndex = 1;

  if (search) {
    query += ` AND (name ILIKE $${valuesIndex} OR description ILIKE $${valuesIndex})`;
    values.push(`%${search}%`);
    valuesIndex++;
  }
  if (category) {
    query += ` AND category = $${valuesIndex}`;
    values.push(category);
    valuesIndex++;
  }
  if (maxPrice) {
    query += ` AND price <= $${valuesIndex}`;
    values.push(maxPrice);
    valuesIndex++;
  }
  if (minPrice) {
    query += ` AND price >= $${valuesIndex}`;
    values.push(minPrice);
    valuesIndex++;
  }

  switch (sort) {
    case 'price_asc':
      query += ` ORDER BY price ASC`
      break;
    case 'price_desc':
      query += ` ORDER BY price DESC`
      break
    default:
      break;
  }
  return { query, values }
}

export default productFiler;
