import { mockAuth, mockSnackbar } from "tests/utils/mockHooks";
import { screen } from "@testing-library/react";
import { Form } from "components";
import { render } from "tests/utils/customRender";

jest.mock("hooks", () => ({
  useSnackbar: jest.fn(),
  useAuth: jest.fn(),
}));

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

describe("Form component", () => {
  it("should render the component onto the screen", () => {
    const mockUser = { id: "1", name: "Som", email: "test@gmail.com" };

    mockAuth(mockUser);

    render(<Form />);

    const formComponent = screen.getByTestId("form-component");
    expect(formComponent).toBeInTheDocument();
  });
});
