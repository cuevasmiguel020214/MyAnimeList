const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authService = {
  // ─── Registrar usuario ──────────────────────────────────────────────────
  register: async ({ username, email, password }) => {
    // Verificar si el email ya existe
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      throw { status: 400, message: 'El email ya está registrado' };
    }

    // Verificar si el username ya existe
    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      throw { status: 400, message: 'El nombre de usuario ya está en uso' };
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generar token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user, token };
  },

  // ─── Login ──────────────────────────────────────────────────────────────
  login: async ({ email, password }) => {
    // Buscar usuario
    const user = await User.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Credenciales incorrectas' };
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw { status: 401, message: 'Credenciales incorrectas' };
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    };
  },
};

module.exports = authService;
