import { useSnackbar } from "hooks";
import { renderWithSnackbar } from "tests/utils/renderWithSnackbar";
import { screen } from "@testing-library/react";

jest.mock("../../../hooks", () => ({
  useSnackbar: jest.fn(),
}));

beforeEach(() => {
  useSnackbar.mockReturnValue({
    message: "Open",
    type: "success",
    open: true,
    closeSnackbar: jest.fn(),
  });
});

describe("Snackbar Component", () => {
  it(" should render the Snackbar with the correct message", () => {
    renderWithSnackbar(null);

    const snackbar = screen.getByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent("Open");
  });
});
