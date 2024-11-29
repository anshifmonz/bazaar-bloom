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

const toggleDefaultCard = async (userId, cardToken) => {
  const clearDefaultQuery = `UPDATE user_cards SET is_default = false WHERE user_id = $1`;
  const setDefaultQuery = `UPDATE user_cards SET is_default = true WHERE card_token = $1 AND user_id = $2`;

  const client = await db.connect();

  try {
    await client.query('BEGIN');
    await client.query(clearDefaultQuery, [userId]);
    await client.query(setDefaultQuery, [cardToken, userId]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('toggleDefaultCard:', err);
    throw new Error('Failed to toggle the default card');
  } finally {
    client.release();
  }
};

export { getCustomerId, saveCard, deleteCard, toggleDefaultCard }
