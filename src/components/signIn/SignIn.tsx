import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import FormInput from "../formInput/FormInput";
import Button, { buttonTypeClass } from "../button/Button";
import { SignInButtonsContainer, SignInFormContainer } from "./SignInStyled";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/userAction";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      dispatch(emailSignInStart(email, password));
      setFormFields(defaultFormFields);
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("incorrect password");
          break;
        case AuthErrorCodes.USER_DELETED:
          alert("user not associeted that email");
          break;
        default:
          break;
      }
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const logGoogleUser = async () => {
    try {
      dispatch(googleSignInStart());
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
          <Button
            type="button"
            buttonType={buttonTypeClass.google}
            onClick={logGoogleUser}
          >
            Google Sign In
          </Button>
        </SignInButtonsContainer>
      </form>
    </SignInFormContainer>
  );
};

export default SignIn;
