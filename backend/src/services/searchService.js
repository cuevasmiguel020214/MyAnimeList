const Anime = require('../models/Anime');
const Manga = require('../models/Manga');

const searchService = {
  // Buscar en anime y manga por título
  search: async (query) => {
    const [animes, mangas] = await Promise.all([
      Anime.search(query),
      Manga.search(query),
    ]);

    return {
      anime: animes,
      manga: mangas,
      total: animes.length + mangas.length,
    };
  },
};

module.exports = searchService;
