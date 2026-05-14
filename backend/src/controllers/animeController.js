const animeService = require('../services/animeService');

const animeController = {
  // GET /api/anime
  getAll: async (req, res, next) => {
    try {
      const animes = await animeService.getAll();
      res.json({
        status: 'ok',
        data: animes,
        total: animes.length,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/anime/:id
  getById: async (req, res, next) => {
    try {
      const anime = await animeService.getById(req.params.id);
      res.json({
        status: 'ok',
        data: anime,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = animeController;
