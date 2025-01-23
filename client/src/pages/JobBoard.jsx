import { useAuth } from "../providers/AuthProvider";
import Form from "../components/Form";

const JobBoard = () => {
  const { user } = useAuth();
  return (
    <div data-testid="job-board">
      <div style={{ textAlign: "center" }}>
        {user ? (
          <h1>Welcome {user.given_name} to your Job Board!</h1>
        ) : (
          <h1>Welcome to your Job Board!</h1>
        )}

        <Form />
      </div>
    </div>
  );
};
export default JobBoard;
