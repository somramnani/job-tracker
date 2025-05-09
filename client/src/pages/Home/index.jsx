import { SignIn } from "components";
import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  return (
    <div data-testid="home-page">
      {user ? <Navigate to="/job-board" replace /> : <SignIn />}
    </div>
  );
};

export default Home;
