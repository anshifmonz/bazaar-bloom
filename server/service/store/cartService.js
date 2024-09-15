import { db } from '../../config/dbConfig.js';

const createCart = async (userId) => {
  try {
    await db.query('INSERT INTO cart (user_id) VALUES ($1)', [userId])
  } catch (err) {
    console.log('createCart: ' + err);
    return 'err'
  }
}

export { createCart };
