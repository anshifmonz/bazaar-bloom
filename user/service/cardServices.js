const getCustomerId = async (userId) => {
  const query = `SELECT customer_id FROM user_cards WHERE user_id = $1`
  
  try {
    const resp = await db.query(query, [userId]);
    return resp.rows[0].customer_id
  } catch (err) {
    throw new Error('getCustomerId: ' + err);
  }
}

const saveCard = async (userId, customerId, token) => {
  const query = `INSERT INTO user_cards (user_id, customer_id, card_token) VALUES ($1, $2, 3$)`

  try {
    await db.query(query, [userId, customerId, token]);
  } catch (err) {
    throw new Error('saveCard: ' + err);
  }
}

const deleteCard = async (userId, cardId) => {
  const query = `DELETE FROM user_cards WHERE user_id = $1 AND card_id = $2`

  try {
    await db.query(query, [userId, cardId]);
  } catch (err) {
    throw new Error('deleteCard: ' + err);
  }
}

export { getCustomerId, saveCard, deleteCard }
