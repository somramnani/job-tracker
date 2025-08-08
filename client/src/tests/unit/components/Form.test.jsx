import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "components";
import { render } from "tests/utils/customRender";

jest.mock("@clerk/clerk-react", () => {
  const React = require("react");
  const useUser = jest.fn();

  const SignInButton = ({ children, mode, afterSignInUrl }) => (
    <div
      data-testid="sign-in-button"
      data-mode={mode}
      data-after-sign-in-url={afterSignInUrl}
    >
      {children}
    </div>
  );
  return { useUser, SignInButton };
});

const { useUser } = require("@clerk/clerk-react");

jest.mock("hooks", () => ({
  useSnackbar: jest.fn(),
}));

jest.mock("axios", () => ({
  get: jest.fn().mockResolvedValue({
    data: { jobTitle: "", companyName: "" },
  }),
}));

import { mockSnackbar } from "tests/utils/mockHooks";

beforeEach(() => {
  jest.clearAllMocks();
  useUser.mockReturnValue({
    isSignedIn: true,
    user: { firstName: "Som" },
  });

  mockSnackbar({
    message: "",
    type: "info",
    open: false,
    closeSnackbar: jest.fn(),
    showSnackbar: jest.fn(),
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({ text: () => Promise.resolve("Success") })
  );
});

const urlInputLabel = /URL Link/i;
const jobNameInputLabel = /Job Name/i;
const companyInputLabel = /Company/i;
const categoryInputLabel = /Category/i;
const pointOfContactInputLabel = /Point of Contact \(optional\)/i;

const testInputField = (label, newValue) => {
  const input = screen.getByLabelText(label);
  fireEvent.change(input, { target: { value: newValue } });
  expect(input.value).toBe(newValue);
};

const setAndTestInputFields = () => {
  testInputField(urlInputLabel, "https://example.com");
  testInputField(jobNameInputLabel, "QA Tester");
  testInputField(companyInputLabel, "OpenAI");
  testInputField(categoryInputLabel, "CS");
  testInputField(pointOfContactInputLabel, "Jane Doe");
};

describe("Form Component", () => {
  it("renders form when user is logged in", () => {
    render(<Form />);
    expect(screen.getByTestId("form-component")).toBeInTheDocument();
  });

  it("updates input fields on change", () => {
    render(<Form />);
    setAndTestInputFields();
  });

  it("clears all inputs when clicking Clear Form button", () => {
    render(<Form />);
    setAndTestInputFields();

    fireEvent.click(screen.getByText("Clear Form"));

    const inputs = [
      urlInputLabel,
      jobNameInputLabel,
      jobNameInputLabel,
      companyInputLabel,
      categoryInputLabel,
      pointOfContactInputLabel,
    ];

    for (let i = 0; i < inputs.length; i++) {
      expect(screen.getByLabelText(inputs[i]).value).toBe("");
    }
  });

  it("handles date change", () => {
    render(<Form />);
    const dateInput = screen.getByPlaceholderText("MM/DD/YYYY");
    fireEvent.change(dateInput, { target: { value: "01/19/2025" } });
    expect(dateInput.value).toBe("01/19/2025");
  });

  it("renders SignInButton with correct props when signed out", () => {
    useUser.mockReturnValueOnce({ isSignedIn: false, user: null });
    render(<Form />);
    const wrapper = screen.getByTestId("sign-in-button");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute("data-mode", "modal");
    expect(wrapper).toHaveAttribute("data-after-sign-in-url", "/job-board");
    expect(screen.getByText("Sign in to continue")).toBeInTheDocument();
    expect(screen.queryByText("Add to Job Board")).not.toBeInTheDocument();
  });

  it("does not render SignInButton when signed in", () => {
    useUser.mockReturnValueOnce({ isSignedIn: true, user: { firstName: "Som" } });
    render(<Form />);
    expect(screen.queryByTestId("sign-in-button")).not.toBeInTheDocument();
    expect(screen.getByText("Add to Job Board")).toBeInTheDocument();
  });
});

it("submits form and shows snackbar", async () => {
  const showSnackbar = jest.fn();
  mockSnackbar({ showSnackbar });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve("Success"),
    })
  );

  render(<Form />);
  setAndTestInputFields();

  fireEvent.click(screen.getByText("Add to Job Board"));

  await waitFor(() => {
    expect(showSnackbar).toHaveBeenCalledWith({
      message: "Added to Google Sheet",
      type: "success",
    });
  });
});
