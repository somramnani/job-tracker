import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "components";
import { render } from "tests/utils/customRender";
import { mockAuth, mockSnackbar } from "tests/utils/mockHooks";

jest.mock("hooks", () => ({
  useAuth: jest.fn(),
  useSnackbar: jest.fn(),
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

    expect(screen.getByLabelText(urlInputLabel).value).toBe("");
    expect(screen.getByLabelText(jobNameInputLabel).value).toBe("");
    expect(screen.getByLabelText(companyInputLabel).value).toBe("");
    expect(screen.getByLabelText(categoryInputLabel).value).toBe("");
    expect(screen.getByLabelText(pointOfContactInputLabel).value).toBe("");
  });

  it("handles date change", () => {
    render(<Form />);
    const dateInput = screen.getByPlaceholderText("MM/DD/YYYY");
    fireEvent.change(dateInput, { target: { value: "01/19/2025" } });
    expect(dateInput.value).toBe("01/19/2025");
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
