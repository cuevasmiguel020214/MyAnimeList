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
