import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "components";

describe("Error Message component", () => {
  it("should render the component onto the screen", () => {
    render(<ErrorMessage fieldName="Company" isFieldNotFound={true} />);

    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not render when isFieldNotFound is false", () => {
    render(<ErrorMessage fieldName="Company" isFieldNotFound={false} />);

    expect(screen.queryByTestId("error-message")).toBeNull();
  });

  it("displays the correct error message", () => {
    render(<ErrorMessage fieldName="Company" isFieldNotFound={true} />);

    expect(screen.getByText("✗ Company not found")).toBeInTheDocument();
  });
});
