import { AccountPreview } from "@toolpad/core/Account";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const AccountSidebarPreview = (props) => {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
};

export default AccountSidebarPreview;
