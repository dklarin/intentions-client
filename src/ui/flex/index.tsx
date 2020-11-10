import styled from "styled-components";

/***
 * The component
 */
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

type TFlexColumnProps = {
  fullWidth?: boolean;
};
export const FlexColumn = styled.div<TFlexColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.fullWidth ? "100%" : "defult")};
  flex: ${(props) => (props.fullWidth ? "1" : "default")};
`;
