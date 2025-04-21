import { useAuth } from "hooks";
import { Form } from "components";

const JobBoard = () => {
  const { user } = useAuth();
  return (
    <div data-testid="job-board">
      <h1 className="title">Job Board</h1>
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
