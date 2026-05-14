const { db } = require('../config/database');

const User = {
  // Buscar usuario por email
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  // Buscar usuario por username
  findByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0] || null;
  },

  // Buscar usuario por ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, username, email, avatar, created_at FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Crear usuario nuevo
  create: async ({ username, email, password }) => {
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return { id: result.insertId, username, email };
  },
};

module.exports = User;
