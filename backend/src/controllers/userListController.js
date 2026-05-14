const userListService = require('../services/userListService');

const userListController = {
  // GET /api/list
  getMyList: async (req, res, next) => {
    try {
      const list = await userListService.getUserList(req.user.id);
      res.json({
        status: 'ok',
        data: list,
        total: list.length,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/list
  addToList: async (req, res, next) => {
    try {
      const { animeId, mangaId, status } = req.body;

      if (!animeId && !mangaId) {
        return res.status(400).json({
          status: 'error',
          message: 'Debes proporcionar animeId o mangaId',
        });
      }

      const result = await userListService.addToList({
        userId: req.user.id,
        animeId,
        mangaId,
        status,
      });

      res.status(201).json({
        status: 'ok',
        message: 'Agregado a la lista',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/list/:id
  updateStatus: async (req, res, next) => {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          status: 'error',
          message: 'El campo status es obligatorio',
        });
      }

      await userListService.updateStatus(req.params.id, req.user.id, status);
      res.json({
        status: 'ok',
        message: 'Estado actualizado',
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/list/:id
  removeFromList: async (req, res, next) => {
    try {
      await userListService.removeFromList(req.params.id, req.user.id);
      res.json({
        status: 'ok',
        message: 'Eliminado de la lista',
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userListController;
