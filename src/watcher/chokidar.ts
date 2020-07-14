import Watcher from "./watcher";

import chokidar from "chokidar";

export default class Chokidar implements Watcher {
  callback: () => void;
  init(path: string, callback: () => void): void {
    this.callback = callback;
    this.setupWatcher(path);
  }

  setupWatcher(path: string) {
    chokidar.watch(path).on("change", () => {
      if (this.callback) {
        this.callback();
      }
    });
  }
}
