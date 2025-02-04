import { PositionedSnackbar } from "components";
import { SnackbarProvider } from "providers";
import { useSnackbar } from "hooks";
import { Button } from "@mui/material";

export default {
  title: "Snackbar",
  component: PositionedSnackbar,
  decorators: [
    (Story) => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
};

const SnackbarWithTrigger = ({
  message = "General Message",
  type = "info",
  buttonMessage = "Show Snackbar",
}) => {
  const { showSnackbar } = useSnackbar();

  return (
    <div>
      <Button
        onClick={() =>
          showSnackbar({
            message,
            type,
          })
        }
        variant="contained"
      >
        {buttonMessage}
      </Button>
      <PositionedSnackbar />
    </div>
  );
};

export const Template = (args) => <SnackbarWithTrigger {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "Enter your message here!",
  type: "success",
  buttonMessage: "Show Snackbar",
};

export const Success = Template.bind({});
Success.args = {
  message: "This is a success message!",
  type: "success",
  buttonMessage: "Show Success Snackbar",
};

export const Warning = Template.bind({});
Warning.args = {
  message: "This is a warning message!",
  type: "warning",
  buttonMessage: "Show Warning Snackbar",
};

export const Error = Template.bind({});
Error.args = {
  message: "This is an error message!",
  type: "error",
  buttonMessage: "Show error Snackbar",
};
