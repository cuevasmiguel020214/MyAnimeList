const UserList = require('../models/UserList');

const userListService = {
  // Obtener lista del usuario
  getUserList: async (userId) => {
    return await UserList.findByUser(userId);
  },

  // Agregar a la lista
  addToList: async ({ userId, animeId, mangaId, status }) => {
    return await UserList.add({ userId, animeId, mangaId, status });
  },

  // Actualizar estado
  updateStatus: async (id, userId, status) => {
    const updated = await UserList.updateStatus(id, userId, status);
    if (!updated) {
      throw { status: 404, message: 'Elemento no encontrado en la lista' };
    }
    return true;
  },

  // Eliminar de la lista
  removeFromList: async (id, userId) => {
    const removed = await UserList.remove(id, userId);
    if (!removed) {
      throw { status: 404, message: 'Elemento no encontrado en la lista' };
    }
    return true;
  },
};

module.exports = userListService;
