import styled from "styled-components";

export const PopupOuterNew = styled.div`
  position: fixed;
  width: 65%;
  height: 90%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0);
`;

export const PopupOuterDelete = styled.div`
  position: fixed;
  width: 40%;
  height: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0);
`;

export const PopupInner = styled.div`
  position: absolute;
  display: flex;

  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  border: 1px solid green;
  background: white;

  box-sizing: border-box;

  max-width: 410px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
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

export const Input = styled.input`
  padding: 0.4rem;
  height: 23px;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  border-radius: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;
