import { SignIn } from "components";
import { JobBoard } from "pages";
import { useAuth } from "hooks";

const Home = () => {
  const { user } = useAuth();
  return <div data-testid="home-page">{user ? <JobBoard /> : <SignIn />}</div>;
};

export default Home;
