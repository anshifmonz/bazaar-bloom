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

export { getUserByEmail, getUserById, CreateUser, updateProfile }
