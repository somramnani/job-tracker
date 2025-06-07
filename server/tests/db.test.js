jest.mock("mysql2", () => {
  return {
    createConnection: jest.fn(() => ({
      connect: jest.fn((cb) => cb(null)),
      query: jest.fn(),
    })),
  };
});

describe("db.js in production (non-test) environment", () => {
  let db;
  let mysql;

  beforeAll(() => {
    process.env.NODE_ENV = "development";
    jest.resetModules();
    mysql = require("mysql2");
    db = require("../db");
  });

  it("should create a MySQL connection with correct config", () => {
    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  });

  it("should call connect() on the connection", () => {
    const mockDb = mysql.createConnection.mock.results[0].value;
    expect(mockDb.connect).toHaveBeenCalled();
  });

  it("should export the db connection object", () => {
    expect(typeof db.query).toBe("function");
  });
});
