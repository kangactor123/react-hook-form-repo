import { Button } from "style";
import styled from "@emotion/styled";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getList } from "module/api";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

function Home() {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("create");
  };
  const handleEdit = () => {
    navigate("thomas/edit");
  };
  useQuery(["list"], getList);
  return (
    <Wrapper>
      <Button onClick={handleCreate}>create</Button>
      <Button onClick={handleEdit}>edit</Button>
    </Wrapper>
  );
}

export default Home;
