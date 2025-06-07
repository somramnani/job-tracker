import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SnackbarProvider } from "providers";
import { PositionedSnackbar } from "components";

/**
 * Renders a UI component with Snackbar context and PositionedSnackbar mounted.
 * @param {ReactNode} ui - Component to render inside the SnackbarProvider.
 */
export const renderWithSnackbar = (ui) => {
  return render(
    <MemoryRouter>
      <SnackbarProvider>
        {ui}
        <PositionedSnackbar />
      </SnackbarProvider>
    </MemoryRouter>
  );
};
