import axios from "axios";

export async function getList() {
  const { data } = await axios.get("http://localhost:3001/list");
  return data;
}
