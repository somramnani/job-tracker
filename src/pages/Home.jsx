import Form from "../components/Form";
import { useAuth } from "../providers/AuthProvider";

const Home = () => {
  const { user } = useAuth();
  return (
    <div style={{ textAlign: "center" }}>
      {user ? (
        <h1>Welcome {user.given_name} to your Job Board!</h1>
      ) : (
        <h1>Welcome to your Job Board!</h1>
      )}

      <Form />
    </div>
  );
};

export default Home;
