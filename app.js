const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');

const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');
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
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.user;
  res.locals.moment = moment;
  next();
});

app.use('/', indexRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use('/posts/:id/comments', commentRoutes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
