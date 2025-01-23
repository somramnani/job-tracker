import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";

const GoogleLoginAuth = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <GoogleLogin
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
        }}
        auto_select={true}
      />
    </>
  );
};

export default GoogleLoginAuth;
