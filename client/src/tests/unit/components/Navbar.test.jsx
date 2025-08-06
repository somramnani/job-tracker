import { fireEvent, screen } from "@testing-library/react";
import { Navbar } from "components";
import { mockAuth, mockSnackbar } from "tests/utils/mockHooks";
import { render } from "tests/utils/customRender";
import { MemoryRouter, Route, Routes } from "react-router-dom";

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
  it("should render Login button and redirect to '/' when clicked", () => {
    mockAuth({
      user: null,
      handleLogout: jest.fn(),
    });

    const TestComponent = () => <div>Home Page</div>;

    render(
      <MemoryRouter initialEntries={[]}>
        <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="*" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);

    const homePage = screen.getByText("Home Page");
    expect(homePage).toBeInTheDocument();
  });
});
