import { useState } from "react";
import { SignInCard, SignUp } from "features/auth";

export default function AuthCard() {
  const [showSignUp, setShowSignUp] = useState(false);

  return showSignUp ? (
    <SignUp onBackToSignIn={() => setShowSignUp(false)} />
  ) : (
    <SignInCard onSignUpClick={() => setShowSignUp(true)} />
  );
}
