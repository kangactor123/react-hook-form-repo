import styled from "styled-components";

export const Row = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 10px;

  & .error {
    color: red;
    margin: 3px;
  }
`;

export const Label = styled.label`
  font-size: 24px;
  font-weight: 700;
  min-width: 120px;
`;

export const Button = styled.button`
  width: 80px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  background-color: tomato;
  color: #ffffff;
  cursor: pointer;
  :hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;
