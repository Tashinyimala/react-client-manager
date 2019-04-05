import React from 'react';

export default function inputComponent(
  onChange,
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
        type={type}
        className="form-control"
        name={name}
        minLength={minLength}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
