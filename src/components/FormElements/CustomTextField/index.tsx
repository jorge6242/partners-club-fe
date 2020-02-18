import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import moment from 'moment';

const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "invalid email address"
}

type CustomTextFieldProps = {
  placeholder: string;
  field: string;
  required: boolean;
  register: Function;
  errorsField: any;
  errorsMessageField: any;
  isEmail: boolean;
  type?: string;
};

const CustomTextField: FunctionComponent<CustomTextFieldProps> = ({
  placeholder,
  field,
  required,
  register,
  errorsField,
  errorsMessageField,
  isEmail,
  type = 'text'
}) => (
  <TextField
    margin="dense"
    fullWidth
    autoFocus
    placeholder={placeholder}
    name={field}
    type={type}
    inputRef={register({
      required: required ? "Required" : false,
      pattern: isEmail ? emailPattern : null
    })}
    required={errorsField ? true : false}
    error={errorsField ? true : false}
    helperText={errorsField && errorsMessageField}
  />
);


export default CustomTextField;