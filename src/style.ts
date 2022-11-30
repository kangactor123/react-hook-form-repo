import styled from "styled-components";

export const Row = styled.div`
  width: 300px;
  /* height: 0px; */
  padding: 4px;

  & .error {
    color: red;
    margin: 3px;
  }
`;

export const Label = styled.label`
  width: 80px;
  display: inline-block;
`;
