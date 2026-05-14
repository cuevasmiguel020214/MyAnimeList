require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// ─── Iniciar servidor ───────────────────────────────────────────────────────
const startServer = async () => {
  // Verificar conexión a MySQL
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.log('⚠️  El servidor iniciará sin conexión a MySQL');
    console.log('   Asegúrate de que MySQL esté corriendo e intenta de nuevo');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    console.log(`📌 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS habilitado para: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
    console.log('');
    console.log('📋 Endpoints disponibles:');
    console.log('   GET    /api/health');
    console.log('   POST   /api/auth/register');
    console.log('   POST   /api/auth/login');
    console.log('   GET    /api/auth/me');
    console.log('   GET    /api/anime');
    console.log('   GET    /api/anime/:id');
    console.log('   GET    /api/manga');
    console.log('   GET    /api/manga/:id');
    console.log('   GET    /api/search?q=...');
    console.log('   GET    /api/favorites');
    console.log('   POST   /api/favorites');
    console.log('   DELETE /api/favorites/:id');
    console.log('   GET    /api/list');
    console.log('   POST   /api/list');
    console.log('   PUT    /api/list/:id');
    console.log('   DELETE /api/list/:id');
  });
};

startServer();
