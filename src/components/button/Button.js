import React from "react";
import "./ButtonStyled.js";
import {
  BaseButton,
  ButtonSpinner,
  GoogleSigInButton,
  InvertedButton,
} from "./ButtonStyled.js";

export const buttonTypeClass = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = buttonTypeClass.base) =>
  ({
    [buttonTypeClass.base]: BaseButton,
    [buttonTypeClass.google]: GoogleSigInButton,
    [buttonTypeClass.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...props }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...props}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
