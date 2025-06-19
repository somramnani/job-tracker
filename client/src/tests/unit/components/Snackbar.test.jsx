import { mockSnackbar } from "tests/utils/mockHooks";
import { render } from "tests/utils/customRender";
import { screen } from "@testing-library/react";

jest.mock("hooks", () => ({
  useSnackbar: jest.fn(),
}));

describe("Snackbar Component", () => {
  beforeEach(() => {
    mockSnackbar({
      message: "Open",
      type: "success",
      open: true,
      closeSnackbar: jest.fn(),
    });
  });

  it("should render the Snackbar with the correct message", () => {
    render();
    const snackbar = screen.getByTestId("snackbar");

    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent("Open");
  });
});
