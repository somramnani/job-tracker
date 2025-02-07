import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useAuth } from "hooks";
import { AccountPopoverFooter, SignOutButton } from "@toolpad/core/Account";

const SidebarFooterAccountPopover = () => {
  const { user } = useAuth();
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
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: "0.95rem",
                bgcolor: "8B4513",
              }}
              src={user?.picture ?? ""}
              alt={user?.given_name ?? ""}
            >
              {user.name}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
            primary={user.given_name}
            secondary={user.email}
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
