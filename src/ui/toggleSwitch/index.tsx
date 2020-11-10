import React from "react";
import styled from "styled-components";

const StyledOuterDiv = styled.div`
  border-radius: 100px;
  width: 50px;
  height: 27px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  color: inherit;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.outerBackgroundColorDisabled
      : props.value
      ? props.theme.outerBackgroundColorOn
      : props.theme.outerBackgroundColorOff};

  border: 2px solid
    ${(props) =>
      props.value ? props.theme.borderColorOn : props.theme.borderColorOff};

  cursor: ${(props) => (props.disabled ? "none" : "grab")};
`;

const StyledInnerDiv = styled.div`
  height: 25px;
  width: 25px;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.innerBackgroundColorDisabled
      : props.theme.innerBackgroundColor};
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.value ? props.theme.borderColorOn : props.theme.borderColorOff};

  grid-column: ${(props) => (props.disabled ? 1 : props.value ? 3 : 1)};
  position: relative;
  bottom: ${(props) => (props.value ? "1px" : "1px")};
  left: ${(props) => (props.value ? "2px" : null)};

  cursor: ${(props) => (props.disabled ? "none" : "pointer")};

  :hover {
    background-color: ${(props) =>
      props.disabled
        ? null
        : props.value
        ? props.theme.outerBackgroundColorOff
        : props.theme.outerBackgroundColorOn};
  }
`;

type TProps = {
  /** value value says is ToggleSwitch is turned off or on */
  value: boolean;
  /** disabled value says is ToggleSwitch disabled ot enabled */
  disabled: boolean;
  /** onChange does something */
  onChange: (value: any) => any;
};

export const ToggleSwitch = (props: TProps) => {
  const { value, disabled, onChange } = props;

  const handleClick = () => {
    const newValue = !value;
    onChange && onChange(newValue);
    props.onChange(null);
  };

  return (
    <StyledOuterDiv onClick={handleClick} disabled={disabled} value={value}>
      <StyledInnerDiv
        onClick={handleClick}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </StyledOuterDiv>
  );
};

export default ToggleSwitch;
