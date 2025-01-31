import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PositionedSnackbar } from "components";
import { MemoryRouter } from "react-router";
import { useSnackbar } from "hooks";

jest.mock("../../hooks", () => ({
  useSnackbar: jest.fn(),
}));

const mockCloseSnackbar = jest.fn();
beforeEach(() => {
  useSnackbar.mockReturnValue({
    message: "Open",
    type: "success",
    open: true,
    closeSnackbar: jest.fn(),
  });
});

const renderSnackbar = () => {
  render(
    <MemoryRouter>
      <PositionedSnackbar />
    </MemoryRouter>
  );
};

describe("Snackbar", () => {
  it("renders the Snackbar with a message", () => {
    renderSnackbar();

    const snackbar = screen.getByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent("Open");
  });

  it("closes when the close button is clicked", async () => {
    renderSnackbar();

    const snackbar = screen.getByTestId("snackbar");
    const closeButton = screen.getByRole("button", { title: "Close" });
    fireEvent.click(closeButton);

    console.log({ closeButton });

    await waitFor(() => {
      expect(mockCloseSnackbar).toHaveBeenCalledTimes(1);
      // expect(screen.queryByText("Open")).not.toBeInTheDocument();
      expect(snackbar).not.toBeVisible();
    });
  });
});
