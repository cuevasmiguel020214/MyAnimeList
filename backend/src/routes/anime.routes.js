const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

// Rutas públicas
router.get('/', animeController.getAll);
router.get('/:id', animeController.getById);

module.exports = router;
