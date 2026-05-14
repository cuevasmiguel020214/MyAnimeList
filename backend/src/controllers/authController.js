const authService = require('../services/authService');

const authController = {
  // POST /api/auth/register
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      // Validación básica
      if (!username || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Todos los campos son obligatorios',
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          status: 'error',
          message: 'La contraseña debe tener al menos 6 caracteres',
        });
      }

      const result = await authService.register({ username, email, password });

      res.status(201).json({
        status: 'ok',
        message: 'Usuario registrado correctamente',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/auth/login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email y contraseña son obligatorios',
        });
      }

      const result = await authService.login({ email, password });

      res.json({
        status: 'ok',
        message: 'Login exitoso',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/auth/me
  getMe: async (req, res, next) => {
    try {
      const User = require('../models/User');
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado',
        });
      }

      res.json({
        status: 'ok',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
