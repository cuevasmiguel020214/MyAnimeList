-- ============================================================================
-- Base de datos: animelistmejorado
-- Esquema para AniVault
-- ============================================================================

CREATE DATABASE IF NOT EXISTS animelistmejorado;
USE animelistmejorado;

-- ─── Tabla de usuarios ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Tabla de animes ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS anime (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  score DECIMAL(4,2) DEFAULT 0,
  genres VARCHAR(255),
  episodes INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'En emisión'
);

-- ─── Tabla de mangas ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS manga (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  score DECIMAL(4,2) DEFAULT 0,
  genres VARCHAR(255),
  chapters INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'En publicación'
);

-- ─── Tabla de favoritos ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  anime_id INT DEFAULT NULL,
  manga_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE,
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
);

-- ─── Tabla de listas de usuario ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_lists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  anime_id INT DEFAULT NULL,
  manga_id INT DEFAULT NULL,
  status VARCHAR(50) DEFAULT 'Planeado',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE,
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
);
