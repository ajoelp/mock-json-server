import Routes from "../src/routes";
import MockWatcher from "../src/watcher/mock";
import data from "./data.json";
import path from "path";

describe("Routes", () => {
  it("will load routes", () => {
    const routes = new Routes(path.resolve(__dirname, "./data.json"), new MockWatcher());
    expect(routes.routes).toStrictEqual(data);
  });

  it("will load from json", () => {
    const routes = new Routes(data, new MockWatcher());
    expect(routes.routes).toStrictEqual(data);
  });

  it("will reload routes when watcher is hit", () => {
    Routes.prototype.onFileChange = jest.fn();
    const mockWatcher = new MockWatcher();
    const routes = new Routes(path.resolve(__dirname, "./data.json"), mockWatcher);

    mockWatcher.triggerCallback();

    expect(routes.onFileChange).toHaveBeenCalled();
  });
});
