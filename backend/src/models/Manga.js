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

  // Buscar mangas por título (title, english_title, japanese_title)
  search: async (query) => {
    const pattern = `%${query}%`;
    const [rows] = await db.query(
      `SELECT * FROM manga 
       WHERE title LIKE ? OR english_title LIKE ? OR japanese_title LIKE ? 
       ORDER BY score DESC 
       LIMIT 20`,
      [pattern, pattern, pattern]
    );
    return rows;
  },

  // Filtrar mangas con criterios dinámicos
  filter: async ({ genre, status, year, sort, limit }) => {
    let sql = 'SELECT DISTINCT m.* FROM manga m';
    const params = [];
    const conditions = [];

    // JOIN con genres si se filtra por género
    if (genre) {
      sql += ' INNER JOIN manga_genres mg ON m.id = mg.manga_id';
      sql += ' INNER JOIN genres g ON mg.genre_id = g.id';
      conditions.push('g.name LIKE ?');
      params.push(`%${genre}%`);
    }

    // Filtro por status
    if (status) {
      conditions.push('m.status = ?');
      params.push(status);
    }

    // Filtro por año
    if (year) {
      conditions.push('m.year = ?');
      params.push(parseInt(year));
    }

    // Aplicar condiciones WHERE
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    // Ordenamiento
    const sortMap = {
      score: 'm.score DESC',
      popularity: 'm.popularity ASC',
      title: 'm.title ASC',
      year: 'm.year DESC',
      chapters: 'm.chapters DESC',
    };
    sql += ' ORDER BY ' + (sortMap[sort] || 'm.score DESC');

    // Límite
    sql += ' LIMIT ?';
    params.push(parseInt(limit) || 50);

    const [rows] = await db.query(sql, params);
    return rows;
  },

  // Obtener géneros de un manga específico
  getGenres: async (mangaId) => {
    const [rows] = await db.query(
      `SELECT g.name FROM genres g
       INNER JOIN manga_genres mg ON g.id = mg.genre_id
       WHERE mg.manga_id = ?`,
      [mangaId]
    );
    return rows.map((r) => r.name);
  },
};

module.exports = Manga;
