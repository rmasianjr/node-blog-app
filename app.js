const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
const errorHandlers = require('./handlers/errorHandlers');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use('/', indexRoutes);
app.use('/posts', postRoutes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
