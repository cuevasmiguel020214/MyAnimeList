const { db } = require('../config/database');

const Anime = {
  // Obtener todos los animes
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM anime ORDER BY score DESC');
    return rows;
  },

  // Obtener anime por ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM anime WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Buscar animes por título
  search: async (query) => {
    const [rows] = await db.query(
      'SELECT * FROM anime WHERE title LIKE ? ORDER BY score DESC',
      [`%${query}%`]
    );
    return rows;
  },
};

module.exports = Anime;
