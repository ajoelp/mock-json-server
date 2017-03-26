var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var enableDestroy = require('server-destroy');
var fs = require('fs');
var chalk = require('chalk');
var moment = require('moment');

var server = null;

var app = express();
var methods = ['get', 'post', 'put', 'delete'];

function logger(req, res, next){
  console.log(moment.utc().format() + " : " + chalk.yellow("["+req.method+"] " + req.url));
  next();
}

function _start(source, port){
  app = express();
  app.use(cors());
  app.use(logger);
  app.locals = {
    _ : _
  };
  app.set('views', __dirname + '/pages');
  app.set('view engine', 'ejs');
  _makeRoutes(_getSource(source));
  _makeHome(port, _getSource(source));
}

function _getSource(source){
  return JSON.parse(fs.readFileSync(source, 'utf-8'));
}

function _listen(port, callback){
  server = app.listen(port, function(){
    callback();
  });
  enableDestroy(server);
}

function _end(){
  server.destroy();
}

function _makeRoutes(source){
  _.each(source, function(value, path){
    _.each(value, function(a, method){
      if(_.includes(methods, method)){
        app[method](path, function(req,res){
          res.jsonp(a);
        });
      }
    });
  });
}

function _makeHome(port, source){
  app.get('/', function (req, res) {
    res.render('index', {
      port: port,
      database: source
    });
  });
}

module.exports = function(source, port){
  return {
    start: function(){
      _start(source, port);
      _listen(port, function(){
        console.log(chalk.green('JSON Server running at http://localhost:'+ port + '/'));
      });
    },
    reload: function(){
      _end();
      _start(source, port);
      _listen(port, function(){
        console.log(chalk.bgBlue('Reloaded Server'));
      });
    }
  }
};


