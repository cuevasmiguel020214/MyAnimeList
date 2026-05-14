const Anime = require('../models/Anime');

const animeService = {
  // Obtener todos los animes
  getAll: async () => {
    return await Anime.findAll();
  },

  // Obtener anime por ID
  getById: async (id) => {
    const anime = await Anime.findById(id);
    if (!anime) {
      throw { status: 404, message: 'Anime no encontrado' };
    }
    return anime;
  },

  // Buscar animes
  search: async (query) => {
    return await Anime.search(query);
  },
};

module.exports = animeService;
