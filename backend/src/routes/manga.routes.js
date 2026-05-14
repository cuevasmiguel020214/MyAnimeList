const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

// Rutas públicas
router.get('/', mangaController.getAll);
router.get('/:id', mangaController.getById);

module.exports = router;
