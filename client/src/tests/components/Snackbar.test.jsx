import { render, screen } from "@testing-library/react";
import { PositionedSnackbar } from "components";
import { MemoryRouter } from "react-router";
import { useSnackbar } from "hooks";

jest.mock("../../hooks", () => ({
  useSnackbar: jest.fn(),
}));
beforeEach(() => {
  useSnackbar.mockReturnValue({
    message: "Open",
    type: "success",
    open: "true",
    closeSnackbar: jest.fn(),
  });
});

describe("Snackbar", () => {
  it("renders the Snackbar with a message", () => {
    render(
      <MemoryRouter>
        <PositionedSnackbar />
      </MemoryRouter>
    );

    const snackbar = screen.getByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent("Open");
  });
});
