import React from "react";
import "./ButtonStyled.js";
import {
  BaseButton,
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

const Button = ({ children, buttonType, ...props }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...props}>{children}</CustomButton>;
};

export default Button;
