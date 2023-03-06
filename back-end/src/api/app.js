const express = require('express');
const routes = require('../routes/routes');

const app = express();
app.use(express.json());

app.use(express.static('public'))

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(routes);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;