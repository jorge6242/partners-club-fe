import React, { FunctionComponent } from "react";

import './index.sass';

type CustomSelectProps = {
  field: string;
  required?: boolean;
  register: Function;
  errorsMessageField: any;
  selectionMessage?: string;
  label?: string;
};

const CustomSelect: FunctionComponent<CustomSelectProps> = ({
  field,
  required = false,
  register,
  errorsMessageField,
  children,
  selectionMessage = 'Seleccione',
  label
}) => (
      <div className="custom-select-container">
      { label && (<div className="custom-select-container__label">{label}</div>) }
      <select
        ref={register({
          required: required ? "Required" : false
        })}
        name={field}
      >
        <option value="">{selectionMessage}</option>
        {children}
      </select>
      <div className="custom-select-container__message">{errorsMessageField}</div>
    </div>
  );

export default CustomSelect;

