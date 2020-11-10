import React from "react";
import styled from "styled-components";
import Select from "react-select";

/*export const Textarea = styled.textarea`
  padding: 0.4rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  border-radius: 5px;
`;*/

import { lighten, darken } from "polished";
const primaryColor = "#74B039";

/**The color palette in use */
export const colorPalette = {
  primary40: lighten(0.6, primaryColor),
  primary45: lighten(0.52, primaryColor),
  primary50: lighten(0.5, primaryColor),
  primary52: lighten(0.48, primaryColor),
  primary55: lighten(0.45, primaryColor),
  primary60: lighten(0.4, primaryColor),
  primary70: lighten(0.3, primaryColor),
  primary80: lighten(0.2, primaryColor),
  primary90: lighten(0.1, primaryColor),
  primary100: primaryColor,
  primary120: darken(0.2, primaryColor),
  primary130: darken(0.3, primaryColor),
  primary140: darken(0.4, primaryColor),
  primary150: darken(0.5, primaryColor),

  /*accent35: lighten(0.65, accentColor),
  accent40: lighten(0.6, accentColor),
  accent45: lighten(0.55, accentColor),
  accent50: lighten(0.5, accentColor),
  accent55: lighten(0.45, accentColor),
  accent60: lighten(0.4, accentColor),
  accent70: lighten(0.3, accentColor),
  accent80: lighten(0.2, accentColor),
  accent100: accentColor,
  accent120: darken(0.2, accentColor),
  accent130: darken(0.3, accentColor),
  accent140: darken(0.4, accentColor),
  accent150: darken(0.5, accentColor),

  errorBase: "#ca3b35",
  errorAlertBackground: " #f8d7da",
  errorAlertText: "#721c24",
  errorAlertBorder: "#f5c6cb",*/
};

export const StyledTextArea = styled(Select)`
  color: inherit;
  position: relative;

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

const statusStyles = {
  container: (provided) => ({
    ...provided,
    width: 135,
    border: `1px solid ${colorPalette.primary80}`,
  }),
};

/*<Select
className="basic-single"
classNamePrefix="select"
defaultValue={status}
isDisabled={false}
isLoading={false}
isClearable={false}
name="status"
options={statusOptions}
onChange={handleStatus}
styles={statusStyles}
/>*/

export const Selecta = (props) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      //defaultValue={status}
      isDisabled={false}
      isLoading={false}
      isClearable={false}
      name="status"
      //options={statusOptions}
      //onChange={handleStatus}
      styles={statusStyles}
    />
  );
};
export default Selecta;

{
  /*<StyledTextArea
      {...props}
      ref={props.inputRef}
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
    />*/
}
