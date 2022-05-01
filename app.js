var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var path = require('path');

var indexRouter = require('./routes/index');
var jpgRouter = require('./routes/jpg');
var csvRouter = require('./routes/csv');
var gifRouter = require('./routes/gif');
var webpRouter = require('./routes/webp');
var fusionRouter = require('./routes/fusion');
var pngRouter = require('./routes/png');
var encryptRouter = require('./routes/encrypt');

var app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({ createParentPath: true }));


app.use('/', indexRouter);
app.use('/jpg', jpgRouter);
app.use('/csv', csvRouter);
app.use('/gif',gifRouter);
app.use('/webp',webpRouter);
app.use('/fusion',fusionRouter);
app.use('/png',pngRouter);
app.use('/encrypt',encryptRouter);

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

module.exports = app;