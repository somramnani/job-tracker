import { screen, fireEvent } from "@testing-library/react";
import { render } from "tests/utils/customRender";
import TestComponent from "./TestComponent";

describe("Snackbar Component", () => {
  it("should show the Snackbar when showSnackbar is triggered", async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText("Open Snackbar"));

    const snackbar = await screen.findByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();

    expect(snackbar).toHaveTextContent("Test Snackbar");
  });
});

describe("SnackbarProvider closeSnackbar", () => {
  it("should close the snackbar when closeSnackbar is called", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("open-state").textContent).toBe("Closed");

    fireEvent.click(screen.getByText("Open Snackbar"));
    expect(screen.getByTestId("open-state").textContent).toBe("Open");

    fireEvent.click(screen.getByText("Close Snackbar"));
    expect(screen.getByTestId("open-state").textContent).toBe("Closed");
  });
});
