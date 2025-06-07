import { screen, fireEvent } from "@testing-library/react";
import { SnackbarContext } from "providers";
import { renderWithSnackbar } from "tests/utils/renderWithSnackbar";
import { useContext } from "react";

const TestComponent = () => {
  const { showSnackbar, closeSnackbar, open } = useContext(SnackbarContext);
  return (
    <>
      <button
        onClick={() =>
          showSnackbar({ message: "Test Snackbar", type: "success" })
        }
      >
        Open Snackbar
      </button>
      <button onClick={closeSnackbar}>Close Snackbar</button>
      <div data-testid="open-state">{open ? "Open" : "Closed"}</div>
    </>
  );
};

describe("Snackbar Component", () => {
  it("should show the Snackbar when showSnackbar is triggered", () => {
    renderWithSnackbar(<TestComponent />);

    fireEvent.click(screen.getByText("Open Snackbar"));

    const snackbar = screen.getByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent("Test Snackbar");
  });
});

describe("SnackbarProvider closeSnackbar", () => {
  it("should close the snackbar when closeSnackbar is called", () => {
    renderWithSnackbar(<TestComponent />);

    expect(screen.getByTestId("open-state").textContent).toBe("Closed");

    fireEvent.click(screen.getByText("Open Snackbar"));
    expect(screen.getByTestId("open-state").textContent).toBe("Open");

    fireEvent.click(screen.getByText("Close Snackbar"));
    expect(screen.getByTestId("open-state").textContent).toBe("Closed");
  });
});
