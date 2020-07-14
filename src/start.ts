import yargs from "yargs";
import Server from "./server";
import first from "lodash/first";

export default function start(): void {
  const argv = yargs
    .config("config")
    .usage("$0 [options] <source>")
    .option("port", {
      alias: "p",
      default: 8000,
    })
    .option("host", {
      alias: "h",
      default: "0.0.0.0",
    })
    .help("help")
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .version(require("../package.json").version)
    .alias("version", "v")
    .example("$0 db.json", "")
    .require(1, "Missing <source> argument").argv;

  Server.create(argv.port, argv.host, first(argv._)).start();
}
