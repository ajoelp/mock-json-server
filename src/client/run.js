const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const server = require('../server');

module.exports = (argv) => {
  const source = argv._[0];
  const app = server(source, argv.port);
  const watcher = chokidar.watch(source);
  watcher.on('change', () => {
    const app = server(source, argv.port);
    app.reload()
  })
  app.start();
};
