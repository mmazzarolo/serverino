/* eslint-disable jest/expect-expect */
const request = require("supertest");
const net = require("net");

const createApp = require("./index.js");
const consoleInfoSpy = jest.spyOn(console, "info");

beforeEach(function () {
  global.console.info.mockImplementation(() => {});
});

afterEach(function () {
  jest.clearAllMocks();
});

test("serves from current path", async function () {
  const app = createApp();
  await request(app.serve(false)).get("/package.json").expect(200);
  await request(app.serve(false)).get("/i-do-not-exist.json").expect(404);
});

test("serves on a custom path", async function () {
  const app = createApp({
    path: "/test",
  });
  await request(app.serve(false)).get("/test/package.json").expect(200);
  await request(app.serve(false)).get("/test/i-do-not-exist.json").expect(404);
});

test.todo("serves on SSL");

test("serves on a custom port", async function () {
  const isPortTaken = (port) =>
    new Promise((resolve, reject) => {
      const tester = net
        .createServer()
        .once("error", (err) =>
          err.code == "EADDRINUSE" ? resolve(true) : reject(err)
        )
        .once("listening", () =>
          tester.once("close", () => resolve(false)).close()
        )
        .listen(port);
    });
  const port = 1337;
  expect(await isPortTaken(port)).toBeFalsy();
  const app = createApp({
    port: port,
  }).serve();
  expect(await isPortTaken(port)).toBeTruthy();
  app.close();
});

test(`serves with "Access-Control-Allow-Origin" set to "*"`, async function () {
  const app = createApp({
    cors: true,
  });
  await request(app.serve(false))
    .get("/package.json")
    .expect(200)
    .expect("Access-Control-Allow-Origin", "*");
});

test(`serves verbosely`, async function () {
  const app = createApp({
    verbose: true,
  });
  await request(app.serve(false)).get("/package.json").expect(200);
  expect(consoleInfoSpy).toHaveBeenCalledWith(
    expect.stringMatching(/\/package.json/)
  );
});
