require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

// ─── Importar rutas ─────────────────────────────────────────────────────────
const authRoutes = require('./routes/auth.routes');
const animeRoutes = require('./routes/anime.routes');
const mangaRoutes = require('./routes/manga.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const searchRoutes = require('./routes/search.routes');
const userListRoutes = require('./routes/userList.routes');

const app = express();

// ─── Middlewares globales ───────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Ruta de prueba (health check) ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API de AniVault funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// ─── Rutas de la API ────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes);
app.use('/api/manga', mangaRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/list', userListRoutes);

// ─── Manejo de rutas no encontradas ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Ruta ${req.originalUrl} no encontrada`,
  });
});

// ─── Manejo global de errores ───────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
