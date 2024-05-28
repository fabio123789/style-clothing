import React from "react";
import "./FormInputStyled.js";
import { Formgroup, FormInputStyle, FormInputLabel } from "./FormInputStyled.js";

const FormInput = ({ label, ...props }) => {
  return (
    <Formgroup>
      <FormInputStyle {...props} />
      {label && (
        <FormInputLabel shrink={props.value.length}>{label}</FormInputLabel>
      )}
    </Formgroup>
  );
};

export default FormInput;
