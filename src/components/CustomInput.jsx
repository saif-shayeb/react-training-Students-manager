import React from "react";

function CustomInput({
  register,
  type,
  name,
  placeholder,
  placeHolder,
  id,
  required,
}) {
  const ph = placeholder ?? placeHolder ?? "";
  return (
    <input
      type={type}
      name={name}
      placeholder={ph}
      id={id}
      {...register(name, { required: required })}
    />
  );
}

export default CustomInput;
