import React from "react";
import {
  signInWithGooglePopup,
  createuserDocFromAuth,
} from "../../utils/firebase/Firebase";
import SignUp from "../../components/signUp/SignUp";

const Signin = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createuserDocFromAuth(user);
      console.log(userDocRef);
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
  };

  return (
    <div>
      <SignUp />
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};

export default Signin;
