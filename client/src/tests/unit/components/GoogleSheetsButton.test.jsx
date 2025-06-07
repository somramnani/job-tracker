import { render, screen } from "@testing-library/react";
import { GoogleSheetsButton } from "components";

describe("Google Sheets Button component", () => {
  it("should render the component onto the screen", () => {
    render(<GoogleSheetsButton />);

    const googleSheetsButton = screen.getByTestId("google-sheet-button");
    expect(googleSheetsButton).toBeInTheDocument();
  });
});
