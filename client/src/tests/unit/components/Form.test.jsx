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

describe("Form Component", () => {
  it("renders form when user is logged in", () => {
    render(<Form />);
    expect(screen.getByTestId("form-component")).toBeInTheDocument();
  });

  it("updates input fields on change", () => {
    render(<Form />);

    // URL
    const urlInput = screen.getByLabelText(/URL Link/i);
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });
    expect(urlInput.value).toBe("https://example.com");

    // Job Name
    const jobNameInput = screen.getByLabelText(/Job Name/i);
    fireEvent.change(jobNameInput, { target: { value: "QA Tester" } });
    expect(jobNameInput.value).toBe("QA Tester");

    // Company
    const companyInput = screen.getByLabelText(/Company/i);
    fireEvent.change(companyInput, { target: { value: "OpenAI" } });
    expect(companyInput.value).toBe("OpenAI");

    // Category
    const categoryInput = screen.getByLabelText(/Category/i);
    fireEvent.change(categoryInput, { target: { value: "CS" } });
    expect(categoryInput.value).toBe("CS");

    // Point of Contact
    const contactInput = screen.getByLabelText(
      /Point of Contact \(optional\)/i
    );
    fireEvent.change(contactInput, { target: { value: "Jane Doe" } });
    expect(contactInput.value).toBe("Jane Doe");
  });
});
