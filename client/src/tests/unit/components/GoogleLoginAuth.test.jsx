import { screen } from "@testing-library/react";
import { GoogleLoginAuth } from "components";
import { render } from "tests/utils/customRender";
import { mockAuth, mockSnackbar } from "tests/utils/mockHooks";

jest.mock("hooks", () => ({
  useAuth: jest.fn(),
  useSnackbar: jest.fn(),
}));

jest.mock("@react-oauth/google", () => ({
  __esModule: true,
  GoogleLogin: () => <button>Sign in with Google</button>,
  GoogleOAuthProvider: ({ children }) => <>{children}</>,
}));

beforeEach(() => {
  jest.clearAllMocks();

  mockAuth({
    user: { id: "1", name: "Som", email: "som@gmail.com" },
    handleLogout: jest.fn(),
  });

  mockSnackbar({
    message: "",
    type: "info",
    open: false,
    closeSnackbar: jest.fn(),
    showSnackbar: jest.fn(),
  });
});

describe("GoogleLoginAuth Component", () => {
  it("renders the Google login button", () => {
    render(<GoogleLoginAuth />);
    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
  });
});
