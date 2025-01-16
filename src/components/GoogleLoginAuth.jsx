import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const GoogleLoginAuth = () => {
  const navigate = useNavigate();

  function handleLogout() {
    googleLogout();
  }
  return (
    <>
      <GoogleLogin
        size="large"
        shape="pill"
        logo_alignment="center"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          console.log(jwtDecode(credentialResponse.credential));
          navigate("/");
          alert("Logged in!");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        auto_select={true}
      />
    </>
  );
};

export default GoogleLoginAuth;
