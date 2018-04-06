const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
const errorHandlers = require('./handlers/errorHandlers');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/posts', postRoutes);

app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
