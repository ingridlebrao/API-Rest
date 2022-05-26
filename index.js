const express = require('express');
const mongoose = require('mongoose');
const app = express();

// forma de ler o JSON
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// rota inicial (endpoint)
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

// entregar uma porta

mongoose
  .connect(
    'mongodb+srv://ingridlebrao:dkkdkdkd@apicluster.nup8m.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Servidor rodando na porta 3000 e MongoDB');
    app.listen(3000);
  })
  .catch((err) => {
    console.log('Erro ao conectar no MongoDB');
  });
