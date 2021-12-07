import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-1a45c.firebaseio.com/",
});

export default instance;
