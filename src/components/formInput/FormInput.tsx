import React, { FC, InputHTMLAttributes } from "react";
import { Formgroup, FormInputStyle, FormInputLabel } from "./FormInputStyled.tsx";

type FormInputProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...props }) => {
  return (
    <Formgroup>
      <FormInputStyle {...props} />
      {label && (
        <FormInputLabel shrink={Boolean(props.value && typeof props.value === "string" && props.value.length)}>{label}</FormInputLabel>
      )}
    </Formgroup>
  );
};

export default FormInput;
