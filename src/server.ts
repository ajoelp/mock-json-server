import express from "express";
import cors from "cors";
import moment from "moment";
import Log from "./log";
import Routes from "./routes";
import { match } from "path-to-regexp";
import path from "path";

export default class Server {
  app: express.Express;
  port: number;
  host: string;
  routes: Routes;
  server: import("http").Server;

  constructor(port: number, host: string, data: string | { [key: string]: any }) {
    this.port = port;
    this.host = host;
    this.app = express();
    this.routes = new Routes(data);
    this.bindMiddleware();
    this.bindDashboardRoute();
    this.bindAppRoute();
  }

  bindMiddleware() {
    this.app.set("views", path.resolve(__dirname, "./views"));
    this.app.set("view engine", "ejs");
    this.app.use(cors());
    this.app.use((req, res, next) => {
      Log.log(`${moment.utc().format()} : ${Log.blue(`[${req.method}] ${req.url}`)}`);
      next();
    });
  }

  bindDashboardRoute() {
    this.app.get("/", (req, res) => {
      return res.render("index", {
        port: this.port,
        host: this.host,
        routes: this.routes.routes,
      });
    });
  }

  bindAppRoute() {
    this.app.all("*", (req, res) => {
      const [path, methodList] = Object.entries(this.routes.routes).find(([path]) =>
        this.doesMatchPath(path, req.url),
      ) || [null, null];

      if (path === null) {
        return res.status(404).json(null);
      }

      if (!methodList[req.method.toLowerCase()]) {
        Log.log(Log.red(`route ${path} does not have method ${req.method}`));
        return res.status(404).json(null);
      }

      return res.jsonp(methodList[req.method.toLowerCase()]);
    });
    return this;
  }

  start() {
    this.server = this.app.listen(this.port, this.host, () => {
      Log.log(`App Listening on ${Log.green(`http://${this.host}:${this.port}`)}`);
    });

    return this;
  }

  stop() {
    this.server?.close();
  }

  reload() {
    Log.log(Log.blue(".reload() has been deprecated."));
  }

  private doesMatchPath(rawPath: string, serverPath: string) {
    return !!match(rawPath, { decode: decodeURIComponent })(serverPath);
  }

  static create(port: number, host: string, data: string | { [key: string]: any }) {
    return new Server(port, host, data);
  }
}
