const searchService = require('../services/searchService');

const searchController = {
  // GET /api/search?q=...
  search: async (req, res, next) => {
    try {
      const { q } = req.query;

      if (!q || q.trim() === '') {
        return res.status(400).json({
          status: 'error',
          message: 'El parámetro de búsqueda "q" es obligatorio',
        });
      }

      const results = await searchService.search(q.trim());

      res.json({
        status: 'ok',
        query: q.trim(),
        data: results,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = searchController;
