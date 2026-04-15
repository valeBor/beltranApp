const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

// REGISTER
router.post('/register', async (req, res) => {
  let { email, password, captchaToken } = req.body;

  if (!captchaToken) {
  return res.json({ message: 'Falta completar el captcha' });
}
const secretKey = '0x4AAAAAAC9z5AwK0vgOUqjg7FzN9VzcLQo';

const formData = new URLSearchParams();
formData.append('secret', secretKey);
formData.append('response', captchaToken);

const cloudflareResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  body: formData
});

const cloudflareData = await cloudflareResponse.json();

if (!cloudflareData.success) {
  return res.json({ message: 'Captcha inválido' });
}



  // 🔴 NORMALIZAR
  email = email.toLowerCase().trim();

  // 🔴 VALIDAR DUPLICADO
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ message: 'El usuario ya existe' });
  }

  // 🔐 HASH
  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hash,
    role: 'user'
  });

  await user.save();

  res.json({ message: 'Usuario creado' });
});


// LOGIN
router.post('/login', async (req, res) => {
  let { email, password } = req.body;

  // 🔴 NORMALIZAR
  email = email.toLowerCase().trim();

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: 'Debe registrarse' });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.json({ message: 'Contraseña incorrecta' });
  }

  res.json({
    message: 'Login OK',
    email: user.email,
    role: user.role
  });
});

module.exports = router;