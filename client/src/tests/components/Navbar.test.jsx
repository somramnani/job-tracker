import { render, screen } from "@testing-library/react";
import { Navbar } from "components";
import { MemoryRouter } from "react-router";
import { useAuth } from "hooks";

jest.mock("../../hooks", () => ({
  useAuth: jest.fn(),
}));

const renderNavbar = (mockUser) => {
  useAuth.mockReturnValue({
    user: mockUser,
    handleLogout: jest.fn(),
  });
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  it("renders the Navbar", () => {
    const mockUser = null;
    renderNavbar(mockUser);

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("renders Logout button when a user is logged in", () => {
    const mockUser = { id: "1", name: "Som", email: "test@gmail.com" };

    renderNavbar(mockUser);

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();

    const loginButton = screen.queryByText("Login");
    expect(loginButton).not.toBeInTheDocument();
  });
});
