/**
  * Module dependencies.
  */
var Batch = require('batch');
var fs = require('fs');
var exec = require('child_process').exec;
var debug = require('debug')('app:web');
var join = require('path').join;
var jade = require('jade');
var redis = require('./redis');
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');


// app

var app = module.exports = express();

// settings

app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.set('views', __dirname+'/views');

// middleware

app.use(morgan('dev'));
app.use(express.static(join(__dirname, '/assets')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride());

// GET /

app.get('/', function(req, res, next){

  redis(function (err, r) {
    if (err) return next(err);
    r.zrange('todos', 0, 1000, function(err, todos){
      if (err) return next(err);
      res.render('index', {
        todos: todos
      });
    });
  });

});

// POST /

app.post('/', function (req, res, next) {

  redis(function (err, r) {
    if (err) return next(err);
    var score = Date.parse((new Date()).toUTCString())/1000;
    r.zadd('todos', score, req.body.todo, function(err){
      if (err) return next(err);
      res.redirect('/');
    });
  });

});

// GET /remove/:todo

app.get('/remove/:todo', function(req, res, next){

  redis(function (err, r) {
    if (err) return next(err);
    r.zrem('todos', req.params.todo, function(err){
      if (err) return next(err);
      res.redirect('/');
    });
  });

});

// 404

app.use(function(req, res, next){
  var err = new Error('404');
  err.status = 404;
  next(err);
});

// error

app.use(function(err, req, res, next){
  debug(err.message);
  res.send(err.status || 500, err.message);
});
