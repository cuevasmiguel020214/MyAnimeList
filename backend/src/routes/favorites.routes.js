const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const { verifyToken } = require('../middleware/auth');

// Todas las rutas de favoritos requieren autenticación
router.get('/', verifyToken, favoritesController.getMyFavorites);
router.post('/', verifyToken, favoritesController.addFavorite);
router.delete('/:id', verifyToken, favoritesController.removeFavorite);

module.exports = router;
