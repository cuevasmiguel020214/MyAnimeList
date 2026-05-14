const express = require('express');
const router = express.Router();
const userListController = require('../controllers/userListController');
const { verifyToken } = require('../middleware/auth');

// Todas las rutas de lista requieren autenticación
router.get('/', verifyToken, userListController.getMyList);
router.post('/', verifyToken, userListController.addToList);
router.put('/:id', verifyToken, userListController.updateStatus);
router.delete('/:id', verifyToken, userListController.removeFromList);

module.exports = router;
