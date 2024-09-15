const updateDataExtractor = (req) => {
  const { productId, name, description, price, stock, category, img_url } = req.body

  if (!productId) return 'Product id required'
  
  let query = 'UPDATE products SET'
  let valueIndex = 1;
  let values = []
  let setClause = []

  if (name) {
    setClause.push(`name = $${valueIndex}`);
    values.push(name)
    valueIndex++;
  }
  if (description) {
    setClause.push(`description = $${valueIndex}`);
    values.push(description)
    valueIndex++;
  }
  if (price) {
    setClause.push(`price = $${valueIndex}`);
    values.push(price)
    valueIndex++;
  }
  if (stock) {
    setClause.push(`stock_quantity = $${valueIndex}`);
    values.push(stock)
    valueIndex++;
  }
  if (category) {
    setClause.push(`category = $${valueIndex}`);
    values.push(category)
    valueIndex++;
  }
  if (img_url) {
    setClause.push(`image_url = $${valueIndex}`);
    values.push(img_url)
    valueIndex++;
  }
  query += ' ' + setClause.join(', ')
  query += ` WHERE id = $${valueIndex}`;
  values.push(productId)

  return { query, values }
}

export default updateDataExtractor;
