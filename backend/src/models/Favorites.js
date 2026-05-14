const { db } = require('../config/database');

const Favorites = {
  // Obtener favoritos de un usuario
  findByUser: async (userId) => {
    const [rows] = await db.query(
      `SELECT f.id, f.anime_id, f.manga_id, f.created_at,
              a.title AS anime_title, a.image AS anime_image, a.score AS anime_score,
              m.title AS manga_title, m.image AS manga_image, m.score AS manga_score
       FROM favorites f
       LEFT JOIN anime a ON f.anime_id = a.id
       LEFT JOIN manga m ON f.manga_id = m.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    );
    return rows;
  },

  // Agregar favorito
  add: async ({ userId, animeId, mangaId }) => {
    const [result] = await db.query(
      'INSERT INTO favorites (user_id, anime_id, manga_id) VALUES (?, ?, ?)',
      [userId, animeId || null, mangaId || null]
    );
    return { id: result.insertId };
  },

  // Eliminar favorito
  remove: async (id, userId) => {
    const [result] = await db.query(
      'DELETE FROM favorites WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  },

  // Verificar si ya es favorito
  exists: async ({ userId, animeId, mangaId }) => {
    let query = 'SELECT id FROM favorites WHERE user_id = ?';
    const params = [userId];

    if (animeId) {
      query += ' AND anime_id = ?';
      params.push(animeId);
    }
    if (mangaId) {
      query += ' AND manga_id = ?';
      params.push(mangaId);
    }

    const [rows] = await db.query(query, params);
    return rows.length > 0;
  },
};

module.exports = Favorites;
