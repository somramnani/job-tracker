import { screen, fireEvent } from "@testing-library/react";
import { SnackbarContext } from "providers";
import { renderWithSnackbar } from "tests/utils/renderWithSnackbar";
import { useContext } from "react";

const TestComponent = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  return (
    <button
      onClick={() =>
        showSnackbar({ message: "Test Snackbar", type: "success" })
      }
    >
      Trigger Snackbar
    </button>
  );
};

describe("Snackbar Component", () => {
  it("should show the Snackbar when showSnackbar is triggered", () => {
    renderWithSnackbar(<TestComponent />);

    fireEvent.click(screen.getByText("Trigger Snackbar"));

    const snackbar = screen.getByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent("Test Snackbar");
  });
});
