import { screen } from "@testing-library/react";
import { Navbar } from "components";
import { mockAuth, mockSnackbar } from "tests/utils/mockHooks";
import { render } from "tests/utils/customRender";

jest.mock("hooks", () => ({
  useAuth: jest.fn(),
  useSnackbar: jest.fn(),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    mockAuth({
      user: null,
      handleLogout: jest.fn(),
    });

    mockSnackbar({
      message: "",
      type: "info",
      open: false,
      closeSnackbar: jest.fn(),
    });
  });

  it("should render the Navbar component onto the screen", () => {
    render(<Navbar />);

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("should render a Logout button when a user is logged in", () => {
    const mockUser = { id: "1", name: "Som", email: "test@gmail.com" };
    mockAuth(mockUser);

    render(<Navbar />);

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();

    const loginButton = screen.queryByText("Login");
    expect(loginButton).not.toBeInTheDocument();
  });
});
