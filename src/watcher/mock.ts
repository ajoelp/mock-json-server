import Watcher from "./watcher";

export default class MockWatcher implements Watcher {
  callback: () => void;

  init(path: string, callback: () => void): void {
    this.callback = callback;
  }

  triggerCallback() {
    this.callback();
  }
}
