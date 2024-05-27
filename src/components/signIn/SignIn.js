import React from "react";
import { useState } from "react";
import {
  signInWithGooglePopup,
  signinAuthUserEmailAndPassword,
} from "../../utils/firebase/Firebase";
import FormInput from "../formInput/FormInput";
import Button from "../button/Button";
import { SignInButtonsContainer, SignInFormContainer } from "./SignInStyled";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, email } = formFields;
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      )
    ) {
      return alert("invalid Email");
    }
    try {
      await signinAuthUserEmailAndPassword(email, password);
      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        case "auth/user-not-found":
          alert("user not associeted that email");
          break;
        default:
          break;
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
  };

  return (
    <SignInFormContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          minLength={6}
          onChange={handleChange}
          name="password"
          value={password}
        />
        <SignInButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </SignInButtonsContainer>
      </form>
    </SignInFormContainer>
  );
};

export default SignIn;
