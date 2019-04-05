import React from 'react';

export default function inputComponentDefaultValue(
  ref,
  htmlFor,
  label,
  name,
  value,
  minLength = 2,
  type = 'text',
  required = true
) {
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}> {label}</label>
      <input
        ref={ref}
        type={type}
        className="form-control"
        name={name}
        minLength={minLength}
        required={required}
        defaultValue={value}
      />
    </div>
  );
}
