import SignIn from "../components/SignIn/SignIn";
import JobBoard from "./JobBoard";
import { useAuth } from "../hooks";

const Home = () => {
  const { user } = useAuth();
  return <div>{user ? <JobBoard /> : <SignIn />}</div>;
};

export default Home;
