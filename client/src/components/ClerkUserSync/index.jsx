import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

const ClerkUserSync = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const lastSyncedUserId = useRef(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;
    if (lastSyncedUserId.current === user.id) return;

    let isActive = true;

    const syncUser = async () => {
      const token = await getToken();

      if (!token || !isActive) return;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/save-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sync Clerk user");
      }

      lastSyncedUserId.current = user.id;
    };

    syncUser().catch((err) => {
      console.error(err);
    });

    return () => {
      isActive = false;
    };
  }, [getToken, isLoaded, isSignedIn, user?.id]);

  return null;
};

export default ClerkUserSync;
