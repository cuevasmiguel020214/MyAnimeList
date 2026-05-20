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

  // Buscar animes por título (title, english_title, japanese_title)
  search: async (query) => {
    const pattern = `%${query}%`;
    const [rows] = await db.query(
      `SELECT * FROM anime 
       WHERE title LIKE ? OR english_title LIKE ? OR japanese_title LIKE ? 
       ORDER BY score DESC 
       LIMIT 20`,
      [pattern, pattern, pattern]
    );
    return rows;
  },
};

module.exports = Anime;
