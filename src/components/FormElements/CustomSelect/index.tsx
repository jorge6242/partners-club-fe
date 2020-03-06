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
    <div>
      { label && (<div>{label}</div>) }
      <div className="custom-select-container">
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
    </div>
  );

export default CustomSelect;

