const Favorites = require('../models/Favorites');

const favoritesService = {
  // Obtener favoritos del usuario
  getUserFavorites: async (userId) => {
    return await Favorites.findByUser(userId);
  },

  // Agregar favorito
  addFavorite: async ({ userId, animeId, mangaId }) => {
    // Verificar que no sea duplicado
    const exists = await Favorites.exists({ userId, animeId, mangaId });
    if (exists) {
      throw { status: 400, message: 'Ya está en favoritos' };
    }

    return await Favorites.add({ userId, animeId, mangaId });
  },

  // Eliminar favorito
  removeFavorite: async (id, userId) => {
    const removed = await Favorites.remove(id, userId);
    if (!removed) {
      throw { status: 404, message: 'Favorito no encontrado' };
    }
    return true;
  },
};

module.exports = favoritesService;
