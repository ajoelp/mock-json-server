var yargs = require('yargs');
var pkg = require('../../package.json');
var run = require('./run');
module.exports = function () {
  var argv = yargs
    .config('config')
    .usage('$0 [options] <source>')
    .options({
      port: {
        alias: 'p',
        description: 'Set port',
        default: 8000
      }
    })
    .help('help').alias('help', 'h')
    .version(pkg.version).alias('version', 'v')
    .example('$0 db.json', '')
    .require(1, 'Missing <source> argument')
    .argv;

  run(argv);
};
