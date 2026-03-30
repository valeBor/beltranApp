const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hash
  });

  await user.save();

  res.json({ message: 'Usuario creado' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'No existe' });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ message: 'Incorrecto' });

  res.json({ message: 'Login OK', role: user.role });
});

module.exports = router;