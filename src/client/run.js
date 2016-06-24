var path = require('path');
var fs = require('fs');
var server = require('../server');

module.exports = function (argv) {
  var source = argv._[0];
  var app = server(source, argv.port);

  fs.watch(source, function(){
    var app = server(source, argv.port);
    app.reload()
  });
  app.start();
};
