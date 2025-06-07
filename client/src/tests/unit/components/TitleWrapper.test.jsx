import { render, screen, waitFor } from "@testing-library/react";
import TitleWrapper from "components/TitleWrapper";

describe("TitleWrapper", () => {
  it("sets the document title and renders children", async () => {
    render(
      <TitleWrapper title="Test Page">
        <h1>Page Content</h1>
      </TitleWrapper>
    );

    await waitFor(() => {
      expect(document.title).toBe("Test Page");
    });

    expect(document.title).toBe("Test Page");
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });
});
