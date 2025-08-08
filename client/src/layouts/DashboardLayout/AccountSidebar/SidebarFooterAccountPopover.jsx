import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useUser, UserButton } from "@clerk/clerk-react";
import { AccountPopoverFooter, SignOutButton } from "@toolpad/core/Account";

const SidebarFooterAccountPopover = () => {
  const { user } = useUser();
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        <MenuItem
          component="button"
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            columnGap: 1,
          }}
        >
          <ListItemIcon>
            <UserButton
              afterSignOutUrl="/auth-page"
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: 32, height: 32 },
                },
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
            primary={user?.fullName ?? user?.username ?? ""}
            secondary={user?.primaryEmailAddress?.emailAddress ?? ""}
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </MenuItem>
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
    
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
};

export default SidebarFooterAccountPopover;
