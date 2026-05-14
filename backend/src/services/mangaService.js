const Manga = require('../models/Manga');

const mangaService = {
  // Obtener todos los mangas
  getAll: async () => {
    return await Manga.findAll();
  },

  // Obtener manga por ID
  getById: async (id) => {
    const manga = await Manga.findById(id);
    if (!manga) {
      throw { status: 404, message: 'Manga no encontrado' };
    }
    return manga;
  },

  // Buscar mangas
  search: async (query) => {
    return await Manga.search(query);
  },
};

module.exports = mangaService;
