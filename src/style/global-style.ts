import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 0em;
  margin-left: 0em;
  width: 100%;
  height: 750px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 700px;
`;

export const LeftGridContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 4;
`;

export const RightGridContainer = styled.div`
  grid-column: 3 / 7;
  grid-row: 1 / 4;
`;

export const MainHeader = styled.div`
  width: 100%;
  height: 40px;
  background-color: #ffaa00;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0rem;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 50%;
  height: 20px;
  background-color: gray;
  border: 1px solid #999;
  border-radius: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const Container = styled.div`
  width: 50%;
  height: 400px;
  border: 1px solid #999;
  border-radius: 5px;
  @media only screen and (max-width: 600px) {
    height: 100%;
    overflow-x: hidden;
  }
`;

export const ResponsiveFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0rem;
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0rem;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 80px;
`;

export const Label = styled.label`
  margin-bottom: 0.25rem;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;
