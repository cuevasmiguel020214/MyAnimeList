const mysql = require('mysql2/promise');

// ─── Conexión a MySQL ───────────────────────────────────────────────────────
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'animelistmejorado',
  waitForConnections: true,
  connectionLimit: 10,
});

// ─── Verificar conexión ────────────────────────────────────────────────────
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ MySQL conectado correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error.message);
    return false;
  }
};

module.exports = { db, testConnection };
