import fs from "fs";
import path from "path";
import log from "./log";
import isString from "lodash/isString";
import Chokidar from "./watcher/chokidar";
import Watcher from "./watcher/watcher";

export default class Routes {
  path: string;
  routes: {
    [path: string]: {
      [method: string]: {
        [data: string]: any;
      };
    };
  };
  constructor(data: string | { [key: string]: any }, watcher: Watcher = new Chokidar()) {
    if (isString(data)) {
      this.path = path.resolve(process.cwd(), data);
      this.readRoutes();
      watcher.init(this.path, this.onFileChange.bind(this));
      return;
    }
    this.routes = data;
  }

  readRoutes() {
    this.routes = JSON.parse(fs.readFileSync(this.path).toString());
  }

  onFileChange() {
    log.log(log.blue(`JSON Schema updated.`));
    this.readRoutes();
  }
}
