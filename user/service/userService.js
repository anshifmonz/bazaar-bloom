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

const addAddress = async (userId, address) => { 
  try {
    const query = `
      UPDATE users
      SET address = array_append(address, 
        jsonb_build_object(
          'id', gen_random_uuid(),
          'street', $2::text,
          'city', $3::text,
          'state', $4::text,
          'postal_code', $5::text,
          'country', $6::text
        )
      )
      WHERE id = $1;
    `;
    
    const { street, city, state, postal_code, country } = address;
    
    await db.query(query, [userId, street, city, state, postal_code, country]);
  } catch (err) {
    throw new Error('addAddress: ' + err);
  }
};

const updateAddress = async (userId, address) => {
  try {
    const query = `
      UPDATE users
      SET address = array(
        SELECT CASE 
            WHEN element->>'id' = $2 
            THEN jsonb_build_object(
                'id', $2::TEXT,
                'street', $3::TEXT,
                'city', $4::TEXT,
                'state', $5::TEXT,
                'postal_code', $6::TEXT,
                'country', $7::TEXT
            )
            ELSE element
        END
        FROM unnest(address) AS element
      )
      WHERE id = $1
    `;
    
    const { id, street, city, state, postal_code, country } = address;
    
    await db.query(query, [userId, id, street, city, state, postal_code, country]);
  } catch (err) {
    throw new Error('updateAddress: ' + err.message);
  }
};

const deleteAddress = async (userId, addressId) => {
  try {
    const query = `
      UPDATE users
      SET address = array(
          SELECT element
          FROM unnest(address) AS element
          WHERE element->>'id' != $2
      )
      WHERE id = $1;
    `;

    await db.query(query, [userId, addressId]);
  } catch (err) {
    throw new Error('deleteAddress: ' + err);    
  }
}

export { 
  getUserByEmail,
  getUserById,
  CreateUser,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress
}
