import React, { CSSProperties } from "react";
import styled from "styled-components";

const StyledLabel = styled.label<any>`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: inherit;
  margin-bottom: ${(props) => (props.size === "l" ? "8px" : "2px")};
  font-size: ${(props) =>
    props.size === "s"
      ? "0.7rem"
      : props.size === "m"
      ? "0.8rem"
      : props.size === "l"
      ? "0.95rem"
      : "0.8rem"};
`;

type TProps = {
  size: "s" | "m" | "l";
  children?: any;
  style?: CSSProperties;
  bold?: boolean;
};
/***
 * The component
 */
export const Label = (props: TProps) => {
  const { bold, style } = props;
  let labelStyle = Object.assign({}, style || {});

  if (bold) labelStyle = Object.assign(labelStyle, { fontWeight: "bold" });
  return <StyledLabel {...props} style={labelStyle} />;
};

Label.defaultProps = {
  size: "m",
};
