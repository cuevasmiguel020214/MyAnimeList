const { db } = require('../config/database');

const Manga = {
  // Obtener todos los mangas
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM manga ORDER BY score DESC');
    return rows;
  },

  // Obtener manga por ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM manga WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Buscar mangas por título
  search: async (query) => {
    const [rows] = await db.query(
      'SELECT * FROM manga WHERE title LIKE ? ORDER BY score DESC',
      [`%${query}%`]
    );
    return rows;
  },
};

module.exports = Manga;
