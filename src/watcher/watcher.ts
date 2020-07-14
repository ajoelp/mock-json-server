export default interface Watcher {
  callback: () => void;
  init(path: string, callback: () => void): void;
}
