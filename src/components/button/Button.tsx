import React, { ButtonHTMLAttributes, FC } from "react";
import {
  BaseButton,
  ButtonSpinner,
  GoogleSigInButton,
  InvertedButton,
} from "./ButtonStyled.tsx";

export enum buttonTypeClass {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
};

const getButton = (buttonType = buttonTypeClass.base) =>
({
  [buttonTypeClass.base]: BaseButton,
  [buttonTypeClass.google]: GoogleSigInButton,
  [buttonTypeClass.inverted]: InvertedButton,
}[buttonType]);

export type ButtonProps = {
  buttonType?: buttonTypeClass
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...props }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...props}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
