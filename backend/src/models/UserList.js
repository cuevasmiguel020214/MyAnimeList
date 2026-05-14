const { db } = require('../config/database');

const UserList = {
  // Obtener lista de un usuario
  findByUser: async (userId) => {
    const [rows] = await db.query(
      `SELECT ul.id, ul.anime_id, ul.manga_id, ul.status, ul.created_at,
              a.title AS anime_title, a.image AS anime_image, a.episodes AS anime_episodes,
              m.title AS manga_title, m.image AS manga_image, m.chapters AS manga_chapters
       FROM user_lists ul
       LEFT JOIN anime a ON ul.anime_id = a.id
       LEFT JOIN manga m ON ul.manga_id = m.id
       WHERE ul.user_id = ?
       ORDER BY ul.created_at DESC`,
      [userId]
    );
    return rows;
  },

  // Agregar a lista
  add: async ({ userId, animeId, mangaId, status }) => {
    const [result] = await db.query(
      'INSERT INTO user_lists (user_id, anime_id, manga_id, status) VALUES (?, ?, ?, ?)',
      [userId, animeId || null, mangaId || null, status || 'Planeado']
    );
    return { id: result.insertId };
  },

  // Actualizar estado
  updateStatus: async (id, userId, status) => {
    const [result] = await db.query(
      'UPDATE user_lists SET status = ? WHERE id = ? AND user_id = ?',
      [status, id, userId]
    );
    return result.affectedRows > 0;
  },

  // Eliminar de lista
  remove: async (id, userId) => {
    const [result] = await db.query(
      'DELETE FROM user_lists WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = UserList;
