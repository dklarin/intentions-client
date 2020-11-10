import styled from "styled-components";

export const Background = styled.img`
  min-height: 100%;
  min-width: 1024px;
  height: auto;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Error = styled.div`
  background-color: orangered;
  border-radius: 25px;
  height: 38px;
  width: 100%;
  margin-top: 8px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  border-radius: 5px;
`;
