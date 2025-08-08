import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import theme from "./theme";
import {
  Dashboard,
  BarChart,
  ConnectWithoutContact,
  Description,
} from "@mui/icons-material";
import SidebarFooterAccount from "./AccountSidebar/SidebarFooterAccount";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useMemo, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import { CircularProgress, Box } from "@mui/material";

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
    segment: "cover-letter",
    title: "Cover Letter",
    icon: <Description />,
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
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const {location} = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();

  const userSession = user
    ? {
        user: {
          name: user.fullName ?? user.username ?? user.primaryEmailAddress?.emailAddress ?? "",
          email: user.primaryEmailAddress?.emailAddress ?? "",
          image: user.imageUrl ?? "",
        },
      }
    : null;

    const [session, setSession] = useState(userSession);


    const handleSignOut = async () => {
      setSession(null);
      await signOut();
      navigate("/");
    };

  const authentication = useMemo(
    () => ({
      signIn: () => {
        setSession(userSession);
      },
      signOut: handleSignOut,
    }),
    [user]
  );

  useEffect(() => {
    setIsLoadingPage(true);

    const timeout = setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);

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
        {isLoadingPage ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Outlet />
        )}
      </DashboardLayout>
    </AppProvider>
  );
};

export default Layout;
