import { SnackbarContext } from "providers";
import { useContext } from "react";

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
