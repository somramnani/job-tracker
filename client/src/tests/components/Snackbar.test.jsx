import { render, screen } from "@testing-library/react";
import { PositionedSnackbar } from "components";
import { MemoryRouter } from "react-router";
import { useSnackbar } from "hooks";
import { SnackbarProvider } from "providers";

jest.mock("../../hooks", () => ({
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

const renderSnackbar = () => {
  render(
    <MemoryRouter>
      <SnackbarProvider>
        <PositionedSnackbar />
      </SnackbarProvider>
    </MemoryRouter>
  );
};

describe("Snackbar Component", () => {
  it(" should render the Snackbar with the correct message", () => {
    renderSnackbar();

    const snackbar = screen.getByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent("Open");
  });

  // it("should close when the close button is clicked", async () => {
  //   renderSnackbar();

  //   const snackbar = screen.getByTestId("snackbar");
  //   const closeButton = screen.getByRole("button", { title: "Close" });
  //   fireEvent.click(closeButton);

  //   console.log({ closeButton });

  //   await waitFor(() => {
  //     expect(mockCloseSnackbar).toHaveBeenCalledTimes(1);
  //     // expect(screen.queryByText("Open")).not.toBeInTheDocument();
  //     expect(snackbar).not.toBeVisible();
  //   });
  // });
});
