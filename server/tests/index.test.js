jest.mock("../db");

const db = require("../db");
const request = require("supertest");
const app = require("../server");

describe("GET /", () => {
  it("should return 200 response", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const mockUsers = [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, mockUsers);
    });

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});
