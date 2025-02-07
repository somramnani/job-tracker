import { SignIn } from "components";
import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/job-board" replace /> : <SignIn />;
};

export default Home;
