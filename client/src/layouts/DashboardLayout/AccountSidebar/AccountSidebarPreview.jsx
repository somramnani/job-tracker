import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { UserButton, useUser } from "@clerk/clerk-react";

const AccountSidebarPreview = (props) => {
  const { mini } = props;
  const { user } = useUser();
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <Stack direction="row" alignItems="center" spacing={1.25} px={1} py={1.25}>
        <UserButton
          afterSignOutUrl="/auth-page"
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: mini ? 32 : 40,
                height: mini ? 32 : 40,
              },
            },
          }}
        />
        {!mini && (
          <Stack direction="column" overflow="hidden">
            <Typography variant="body2" noWrap>
              {user?.fullName ?? user?.username ?? ""}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.primaryEmailAddress?.emailAddress ?? ""}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default AccountSidebarPreview;
