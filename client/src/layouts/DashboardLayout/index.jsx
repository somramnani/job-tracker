import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import theme from "./theme";
import {
  Dashboard,
  BarChart,
  ConnectWithoutContact,
} from "@mui/icons-material";
import SidebarFooterAccount from "./AccountSidebar/SidebarFooterAccount";
import { useAuth } from "hooks";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "job-board",
    title: "Job Board",
    icon: <Dashboard />,
  },
  {
    segment: "overview",
    title: "Overview",
    icon: <BarChart />,
  },
  {
    segment: "networking",
    title: "Networking",
    icon: <ConnectWithoutContact />,
  },
];

const Layout = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const userSession = {
    user: {
      name: user?.name,
      email: user?.email,
      image: user?.picture,
    },
  };

  const handleSignOut = () => {
    setSession(null);
    handleLogout();
    navigate("/");
  };

  const [session, setSession] = useState(userSession);

  const authentication = useMemo(
    () => ({
      signIn: () => {
        setSession(userSession);
      },
      signOut: handleSignOut,
    }),
    [handleLogout]
  );
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={theme}
      authentication={authentication}
      session={session}
      branding={{
        title: "Job Tracker",
        homeUrl: "/job-board",
      }}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default Layout;
