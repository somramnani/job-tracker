import { useContext } from "react";
import { SnackbarContext } from "providers";

const TestComponent = () => {
  const { showSnackbar, closeSnackbar, open } = useContext(SnackbarContext);
  return (
    <>
      <button
        onClick={() =>
          showSnackbar({
            message: "Test Snackbar",
            type: "success",
            open: true,
          })
        }
      >
        Open Snackbar
      </button>
      <button onClick={closeSnackbar}>Close Snackbar</button>
      <div data-testid="open-state">{open ? "Open" : "Closed"}</div>
    </>
  );
};

export default TestComponent;
