const yargs = require("yargs");
const pkg = require("../../package.json");
const run = require("./run");
module.exports = function() {
  const argv = yargs
    .config("config")
    .usage("$0 [options] <source>")
    .option('port', {
      alias: 'p',
      default: 8000
    })
    .option('host', {
      alias: 'h',
      default: "127.0.0.1"
    })
    .help("help")
    .version(pkg.version)
    .alias("version", "v")
    .example("$0 db.json", "")
    .require(1, "Missing <source> argument").argv;
  
  run(argv);
};
