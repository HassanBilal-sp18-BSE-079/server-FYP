var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
let config = require('config');



var usersRouter = require('./routes/api/usersRouter');
var preBuiltDesktopRouter = require('./routes/api/preBuiltDesktopRouter');
var pcPartsRouter = require('./routes/api/pcPartsRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', usersRouter);
app.use('/api/preBuiltDesktop', preBuiltDesktopRouter);
app.use('/api/pcParts', pcPartsRouter);

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


mongoose.connect( config.get('db') ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
  console.log('database connected succesfully');
}).catch(err=>{
  console.log('problem connecting database');
  console.log(err);
});


module.exports = app;
