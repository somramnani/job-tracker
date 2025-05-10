import { useSnackbar } from "hooks";

const useHandleCopy = () => {
  const { showSnackbar } = useSnackbar();

  const handleCopy = (dataToCopy) => {
    navigator.clipboard
      .writeText(dataToCopy)
      .then(() => {
        showSnackbar({ message: "Copied to clipboard!", type: "success" });
      })
      .catch((error) => {
        showSnackbar({
          message: "Failed to copy. Please try again.",
          type: "error",
        });
        console.error(error);
      });
  };

  return handleCopy;
};

export default useHandleCopy;
