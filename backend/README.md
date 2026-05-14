# 🔧 AniVault — Backend API

API REST para la plataforma AniVault construida con Node.js, Express y MySQL.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Edita el archivo `.env` con tus credenciales de MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=animelistmejorado
```

### 3. Crear la base de datos

Ejecuta los scripts SQL en MySQL:

```bash
# Primero el esquema
mysql -u root -p < src/database/schema.sql

# Después los datos de prueba
mysql -u root -p < src/database/seed.sql
```

O abre los archivos en MySQL Workbench y ejecútalos manualmente.

### 4. Iniciar el servidor

```bash
# Desarrollo (con hot-reload)
npm run dev

# Producción
npm start
```

El servidor estará en: `http://localhost:5000`

## 📋 Endpoints

### Auth (Autenticación)
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/me` | Obtener perfil | Sí |

### Anime
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/anime` | Listar todos | No |
| GET | `/api/anime/:id` | Obtener por ID | No |

### Manga
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/manga` | Listar todos | No |
| GET | `/api/manga/:id` | Obtener por ID | No |

### Búsqueda
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/search?q=...` | Buscar anime y manga | No |

### Favoritos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/favorites` | Mis favoritos | Sí |
| POST | `/api/favorites` | Agregar favorito | Sí |
| DELETE | `/api/favorites/:id` | Eliminar favorito | Sí |

### Lista Personal
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/list` | Mi lista | Sí |
| POST | `/api/list` | Agregar a lista | Sí |
| PUT | `/api/list/:id` | Cambiar estado | Sí |
| DELETE | `/api/list/:id` | Eliminar de lista | Sí |

## 🔐 Autenticación

Las rutas protegidas requieren un header `Authorization`:

```
Authorization: Bearer <token_jwt>
```

El token se obtiene al hacer login o registro.

## 📁 Estructura

```
backend/
├── src/
│   ├── config/       → Conexión a MySQL
│   ├── controllers/  → Lógica de cada endpoint
│   ├── middleware/    → JWT y manejo de errores
│   ├── models/       → Consultas a la base de datos
│   ├── routes/       → Definición de rutas
│   ├── services/     → Lógica de negocio
│   ├── database/     → Scripts SQL
│   └── app.js        → Configuración de Express
├── server.js         → Punto de entrada
├── .env              → Variables de entorno
└── package.json      → Dependencias
```
