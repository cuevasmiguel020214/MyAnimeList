const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

// Rutas públicas
router.get('/', mangaController.getAll);
router.get('/filter', mangaController.filter); // ANTES de /:id para evitar conflicto
router.get('/:id', mangaController.getById);

module.exports = router;
