const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Ruta pública de búsqueda
router.get('/', searchController.search);

module.exports = router;
