const favoritesService = require('../services/favoritesService');

const favoritesController = {
  // GET /api/favorites
  getMyFavorites: async (req, res, next) => {
    try {
      const favorites = await favoritesService.getUserFavorites(req.user.id);
      res.json({
        status: 'ok',
        data: favorites,
        total: favorites.length,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/favorites
  addFavorite: async (req, res, next) => {
    try {
      const { animeId, mangaId } = req.body;

      if (!animeId && !mangaId) {
        return res.status(400).json({
          status: 'error',
          message: 'Debes proporcionar animeId o mangaId',
        });
      }

      const result = await favoritesService.addFavorite({
        userId: req.user.id,
        animeId,
        mangaId,
      });

      res.status(201).json({
        status: 'ok',
        message: 'Agregado a favoritos',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/favorites/:id
  removeFavorite: async (req, res, next) => {
    try {
      await favoritesService.removeFavorite(req.params.id, req.user.id);
      res.json({
        status: 'ok',
        message: 'Eliminado de favoritos',
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = favoritesController;
