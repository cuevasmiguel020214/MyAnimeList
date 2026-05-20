const mangaService = require('../services/mangaService');

const mangaController = {
  // GET /api/manga
  getAll: async (req, res, next) => {
    try {
      const mangas = await mangaService.getAll();
      res.json({
        status: 'ok',
        data: mangas,
        total: mangas.length,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/manga/filter?genre=Action&status=Finished&year=2020&sort=score&limit=50
  filter: async (req, res, next) => {
    try {
      const { genre, status, year, sort, limit } = req.query;
      const mangas = await mangaService.filter({ genre, status, year, sort, limit });
      res.json({
        status: 'ok',
        data: mangas,
        total: mangas.length,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/manga/:id
  getById: async (req, res, next) => {
    try {
      const manga = await mangaService.getById(req.params.id);
      res.json({
        status: 'ok',
        data: manga,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = mangaController;
