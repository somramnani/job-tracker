import { screen } from "@testing-library/react";
import { Navbar } from "components";
import { render } from "tests/utils/customRender";

jest.mock("@clerk/clerk-react", () => {
  const React = require("react");
  const api = {
    useUser: jest.fn(),
    useClerk: () => ({ signOut: jest.fn() }),
    SignedIn: ({ children }) => {
      const { isSignedIn } = api.useUser();
      return isSignedIn ? <>{children}</> : null;
    },
    SignedOut: ({ children }) => {
      const { isSignedIn } = api.useUser();
      return isSignedIn ? null : <>{children}</>;
    },
    UserButton: () => <button>Account</button>,
  };
  return api;
});

const { useUser } = require("@clerk/clerk-react");

describe("Navbar Component", () => {
  it("renders", () => {
    useUser.mockReturnValue({ isSignedIn: false, user: null });
    render(<Navbar />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("shows Login when signed out", () => {
    useUser.mockReturnValue({ isSignedIn: false, user: null });
    render(<Navbar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("hides Login and shows account/menu when signed in", () => {
    useUser.mockReturnValue({
      isSignedIn: true,
      user: {
        fullName: "Som",
        primaryEmailAddress: { emailAddress: "som@example.com" },
      },
    });
    render(<Navbar />);
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    // Either check nav item or mocked UserButton
    expect(screen.getByText("Job Board")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /account/i })).toBeInTheDocument();
  });
});