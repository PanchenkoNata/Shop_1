const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const i18n = require('i18n');

const config = require('config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: config.get('session:name'),
  resave: false,
  saveUninitialized: false,
  secret: config.get('session:secret'),
  cookie: {
    maxAge: config.get('session:maxAge'),
    sameSite: true,
    secure: config.get('session:in_prod'),
  },
}));

i18n.configure({
  locales:['en', 'ru'],
  directory: __dirname + '/locales',
  defaultLocale: 'ru',
});
app.use(i18n.init);

let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }
  next(createError(503));
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    console.log('Routes already enabled');
    return;
  }
  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;
