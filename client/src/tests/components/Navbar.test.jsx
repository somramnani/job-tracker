import { render, screen } from "@testing-library/react";
import { Navbar } from "components";
import { MemoryRouter } from "react-router";
import { useAuth } from "hooks";

jest.mock("../../hooks", () => ({
  useAuth: jest.fn(),
}));

<<<<<<< HEAD
const renderNavbar = (mockUser) => {
  useAuth.mockReturnValue({
    user: mockUser,
    handleLogout: jest.fn(),
  });
=======
const renderNavbar = () => {
>>>>>>> be63079 (chore(snackbar): add snackbar tests)
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  it("renders the Navbar", () => {
<<<<<<< HEAD
    const mockUser = null;
    renderNavbar(mockUser);
=======
    useAuth.mockReturnValue({
      user: null,
      handleLogout: jest.fn(),
    });

    renderNavbar();
>>>>>>> be63079 (chore(snackbar): add snackbar tests)

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("renders Logout button when a user is logged in", () => {
    const mockUser = { id: "1", name: "Som", email: "test@gmail.com" };

<<<<<<< HEAD
    renderNavbar(mockUser);
=======
    renderNavbar();
>>>>>>> be63079 (chore(snackbar): add snackbar tests)

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();

    const loginButton = screen.queryByText("Login");
    expect(loginButton).not.toBeInTheDocument();
  });
});
