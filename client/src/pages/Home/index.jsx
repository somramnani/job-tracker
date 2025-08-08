import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Home = () => {
  return (
    <div data-testid="home-page">
      <SignedIn>
        <Navigate to="/job-board" replace />
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth-page" replace />
      </SignedOut>
    </div>
  );
};

export default Home;
