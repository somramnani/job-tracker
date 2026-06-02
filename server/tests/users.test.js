const request = require("supertest");
const app = require("../server");
const prisma = require("../utils/prismaClient");

jest.mock("@clerk/express", () => ({
  clerkMiddleware: () => (req, res, next) => next(),
}));

jest.mock("../utils/prismaClient", () => ({
  user: {
    findMany: jest.fn(),
  },
}));

describe("GET /users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of users", async () => {
    const mockUsers = [
      { id: 1, clerkId: "user_1", name: "Alice", email: "alice@example.com" },
      { id: 2, clerkId: "user_2", name: "Bob", email: "bob@example.com" },
    ];

    prisma.user.findMany.mockResolvedValue(mockUsers);

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if Prisma fails", async () => {
    prisma.user.findMany.mockRejectedValue(new Error("Database unavailable"));

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database unavailable" });
  });
});
