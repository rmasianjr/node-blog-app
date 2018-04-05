const express = require('express');
const path = require('path');

const indexRoutes = require('./routes/index');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);

module.exports = app;
