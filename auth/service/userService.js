import { db } from '../config/dbConfig.js'

const getUserById = async (id, need) => {
  try {
    const res = await db.query(
      'SELECT * FROM users WHERE id = $1', [id]
    )
    if (need === 'data') return res.rows[0] || false
    if (need === 'exist') return res.rows.length > 0
  } catch (err) {
    throw new Error('Server error');
  }
}

const getUserByEmail = async (email, need) => {
  try {
    const res = await db.query(
      'SELECT * FROM users WHERE email = $1', [email]
    )    
    if (need === 'data') return res.rows[0] || false
    if (need === 'exist') return res.rows.length > 0
  } catch (err) {
    throw new Error('Server error');
  }
}

const CreateUser = async (firstName, lastName, email, passwd) => {
  try {
    const res = await db.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', 
      [firstName, lastName, email, passwd]
    )
    return res.rows;
  } catch (err) {
    throw new Error('Server error');
  }
}

const updateProfile = async (query, values) => {
  try {
    const resp = await db.query(query, values);
    return resp.rows;
  } catch (err) {
    throw new Error('updateProfile: ' + err);
  }
}

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

export { getUserByEmail, getUserById, CreateUser, updateProfile, getCustomerId, saveCard, deleteCard }
