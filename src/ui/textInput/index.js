import React from "react";
import styled from "styled-components";

export const StyledInput = styled.input`
  color: inherit;
  position: relative;
  height: 23px;
  width: ${(props) => props.width || "auto"};
  background-color: ${(props) => props.theme.inputBackgroundColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.borderColor};
  outline: none;
  padding: ${(props) => props.theme.inputPadding};
  padding-left: ${(props) =>
    props.icon ? "2.5rem" : props.theme.inputPadding};
  color: ${(props) => props.theme.color};
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-size: 1.5rem 1.5rem;
  background-position: 0.5rem 50%;
  &:hover:not([readonly]) {
    border-color: ${(props) => props.theme.borderHoverColor};
  }
  &:focus {
    border-color: ${(props) => props.theme.borderFocusColor};
    box-shadow: ${(props) => props.theme.borderFocusBoxShadow};
  }
  &::placeholder {
    color: ${(props) => props.theme.placeholderColor};
  }
  &:readonly {
  }
  &:hover {
    border-color: ${(props) => props.theme.borderHoverColor};
  }
`;

export const TextInput = (props) => {
  return (
    <StyledInput
      {...props}
      ref={props.inputRef}
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
    />
  );
};
export default TextInput;
