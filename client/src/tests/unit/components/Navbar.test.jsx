import { render, screen } from "@testing-library/react";
import { Navbar } from "components";
import { MemoryRouter } from "react-router";
import { useAuth } from "hooks";

jest.mock("../../../hooks", () => ({
  useAuth: jest.fn(),
}));

const renderNavbarWithUser = (mockUser) => {
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

describe("Navbar Component", () => {
  it("should render the Navbar component onto the screen", () => {
    const mockUser = null;
    renderNavbarWithUser(mockUser);

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("should render a Logout button when a user is logged in", () => {
    const mockUser = { id: "1", name: "Som", email: "test@gmail.com" };

    renderNavbarWithUser(mockUser);

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();

    const loginButton = screen.queryByText("Login");
    expect(loginButton).not.toBeInTheDocument();
  });
});
