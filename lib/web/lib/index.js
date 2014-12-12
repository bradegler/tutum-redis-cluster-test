/**
  * Module dependencies.
  */
var Batch = require('batch');
var fs = require('fs');
var exec = require('child_process').exec;
var debug = require('debug')('app:web');
var join = require('path').join;
var jade = require('jade');
var redis = require('redis-cluster').clusterClient;
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');


// app

var app = module.exports = express();

// settings

app.use(morgan('dev'));
app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.set('views', __dirname+'/views');

// middleware

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(join(__dirname, '/assets')));

// GET /

app.get('/', function(req, res, next){

  new redis.clusterInstance('', function (err, r) {
    if (err) return next(err);
    r.lrange('todos', from, to, function(err, ids){
      if (err) return next(err);
      var batch = new Batch;
      ids.forEach(function(id){
        batch.push(client.hgetall.bind(client, 'todos:'+id));
      });
      batch.end(function(err, todos){
        if (err) return next(err);
        res.render('index', {
          todos: todos
        });
      });
    });
  });

});

// POST /

app.post('/', function (req, res, next) {
  res.redirect('/');
});

// GET /remove/:key

app.get('/remove/:key', function(req, res, next){
  res.redirect('/');
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
