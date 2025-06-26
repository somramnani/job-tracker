import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useAuth, useSnackbar } from "hooks";

const GoogleLoginAuth = () => {
  const { setUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return (
    <>
      <GoogleLogin
        data-testid="google-login-auth-component"
        size="large"
        shape="pill"
        logo_alignment="center"
        onSuccess={(credentialResponse) => {
          const decodedUser = jwtDecode(credentialResponse.credential);
          console.log("Login Successful:", decodedUser);

          setUser(decodedUser);
          navigate("/job-board");
        }}
        onError={() => {
          console.log("Login Failed");
          showSnackbar({ message: "Login Failed", type: "error" });
        }}
        auto_select={true}
      />
    </>
  );
};

export default GoogleLoginAuth;
