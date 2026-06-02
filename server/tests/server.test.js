const request = require("supertest");
const app = require("../server");

jest.mock("@clerk/express", () => ({
  clerkMiddleware: () => (req, res, next) => next(),
}));

describe("GET /", () => {
  it("should return 200 response", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
