import axios from "axios";

const setAuthToken = (token) => {
  const AUTH_TOKEN = `Bearer ${token}`;
  if (token) {
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
