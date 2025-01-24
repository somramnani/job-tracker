import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../../components/Navbar/Navbar";
import { MemoryRouter } from "react-router";

jest.mock("../../hooks", () => ({
  useAuth: jest.fn(() => ({
    useAuth: jest.fn(),
  })),
}));

describe("Navbar", () => {
  it("renders the Navbar", () => {
    jest.mock("../../hooks", () => ({
      useAuth: jest.fn(() => ({
        user: null,
        handleLogout: jest.fn(),
      })),
    }));
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("renders Logout button when a user is logged in", () => {
    const mockUser = { id: "1", name: "Som", email: "test@gmail.com" };
    require("../../hooks").useAuth.mockReturnValue({
      user: mockUser,
      handleLogout: jest.fn(),
    });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();

    const loginButton = screen.queryByText("Login");
    expect(loginButton).not.toBeInTheDocument();
  });
});
