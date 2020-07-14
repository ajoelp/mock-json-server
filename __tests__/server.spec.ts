import supertest from "supertest";
import Server from "../src/server";
import testData from "./data.json";

describe("server", () => {
  let app: Server;
  const PORT = 8080;
  const HOST = "127.0.0.1";

  beforeEach(() => {
    app = new Server(PORT, HOST, testData);
  });

  it("will load the server", async () => {
    const response = await supertest(app.app).get("/");
    expect(response.status).toBe(404);
  });

  it.each(["get", "put", "post", "patch", "delete"])("will load a %s route", async method => {
    const response = await supertest(app.app)[method]("/home");
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(testData["/home"][method].data);
  });

  it.each(["get", "put", "post", "patch", "delete"])("will load a %s route with parameter", async method => {
    const response = await supertest(app.app)[method]("/test/:id");
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(testData["/test/:id"][method].data);
  });
});
