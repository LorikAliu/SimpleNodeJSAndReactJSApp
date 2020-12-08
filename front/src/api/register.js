import axios from "axios";

const addUser = async (data) => {
  const res = await axios.post(`http://localhost:5000/register`, data);
  return res.data;
};

export { addUser };
