import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 0.9375rem;
  font-family: inherit;
  transition: var(--transition);
  background: var(--bg-main);
  color: var(--text-main);
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-light);
  }
`;

function CustomInput({
  register,
  type,
  name,
  placeholder,
  placeHolder,
  id,
  required = false,
  registerOptions = {},
  ...rest
}) {
  const ph = placeholder ?? placeHolder ?? "";
  return (
    <StyledInput
      type={type}
      placeholder={ph}
      id={id}
      {...register(name, { required, ...registerOptions })}
      {...rest}
    />
  );
}

export default CustomInput;
