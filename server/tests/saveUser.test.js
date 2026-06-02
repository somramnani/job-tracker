const request = require("supertest");
const app = require("../server");
const { clerkClient, getAuth } = require("@clerk/express");
const prisma = require("../utils/prismaClient");

jest.mock("@clerk/express", () => ({
  clerkMiddleware: () => (req, res, next) => next(),
  getAuth: jest.fn(),
  clerkClient: {
    users: {
      getUser: jest.fn(),
    },
  },
}));

jest.mock("../utils/prismaClient", () => ({
  user: {
    upsert: jest.fn(),
  },
}));

describe("POST /api/save-user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 when the request is not authenticated", async () => {
    getAuth.mockReturnValue({ isAuthenticated: false, userId: null });

    const response = await request(app).post("/api/save-user");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "User not authenticated" });
    expect(clerkClient.users.getUser).not.toHaveBeenCalled();
    expect(prisma.user.upsert).not.toHaveBeenCalled();
  });

  it("should upsert the authenticated Clerk user", async () => {
    const savedUser = {
      id: 1,
      clerkId: "user_123",
      name: "Som Ramnani",
      email: "som@example.com",
    };

    getAuth.mockReturnValue({ isAuthenticated: true, userId: "user_123" });
    clerkClient.users.getUser.mockResolvedValue({
      id: "user_123",
      firstName: "Som",
      lastName: "Ramnani",
      fullName: "Som Ramnani",
      username: "som",
      primaryEmailAddress: {
        emailAddress: "som@example.com",
      },
      emailAddresses: [],
    });
    prisma.user.upsert.mockResolvedValue(savedUser);

    const response = await request(app).post("/api/save-user");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, user: savedUser });
    expect(clerkClient.users.getUser).toHaveBeenCalledWith("user_123");
    expect(prisma.user.upsert).toHaveBeenCalledWith({
      where: { clerkId: "user_123" },
      update: { name: "Som Ramnani", email: "som@example.com" },
      create: {
        clerkId: "user_123",
        name: "Som Ramnani",
        email: "som@example.com",
      },
    });
  });

  it("should return 400 when Clerk has no user email", async () => {
    getAuth.mockReturnValue({ isAuthenticated: true, userId: "user_123" });
    clerkClient.users.getUser.mockResolvedValue({
      id: "user_123",
      firstName: "Som",
      lastName: "Ramnani",
      fullName: "Som Ramnani",
      emailAddresses: [],
    });

    const response = await request(app).post("/api/save-user");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "User email is required" });
    expect(prisma.user.upsert).not.toHaveBeenCalled();
  });
});
