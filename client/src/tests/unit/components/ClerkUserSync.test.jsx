import { render, waitFor } from "@testing-library/react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { ClerkUserSync } from "components";

jest.mock("@clerk/clerk-react", () => ({
  useAuth: jest.fn(),
  useUser: jest.fn(),
}));

describe("ClerkUserSync", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_SERVER_URL = "http://localhost:4000";
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  it("does not sync when the user is signed out", () => {
    useAuth.mockReturnValue({
      getToken: jest.fn(),
      isLoaded: true,
      isSignedIn: false,
    });
    useUser.mockReturnValue({ user: null });

    render(<ClerkUserSync />);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("syncs the signed-in Clerk user with a bearer token", async () => {
    const getToken = jest.fn().mockResolvedValue("session-token");

    useAuth.mockReturnValue({
      getToken,
      isLoaded: true,
      isSignedIn: true,
    });
    useUser.mockReturnValue({ user: { id: "user_123" } });

    render(<ClerkUserSync />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/api/save-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer session-token",
          },
        }
      );
    });
  });
});
