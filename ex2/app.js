var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var axios = require("axios");

app.use(cookieParser());

// Faz o pedido do token 
axios.post('http://clav-api.di.uminho.pt/v2/users/login', {"username":"daw2020@teste.uminho.pt", "password":"232" })
    .then(dados=> {
      var token = dados.data.token
      console.log('Token: ' + token + "\n\n")
      app.set('token', token);   // Guarda o token na variavel token
    })
      .catch (e =>
        console.log("erro: não consegui obter o token! " + e ))
    
app.use('/', indexRouter);

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
