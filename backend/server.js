const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// conexión a mongo
mongoose.connect('mongodb://127.0.0.1:27017/beltran')
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.log(err));

// rutas
app.use('/api/auth', require('./routes/auth'));

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});