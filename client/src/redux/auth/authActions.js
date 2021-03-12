import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./authTypes";
import axios from "axios";
import { setAlert } from "../alert/alertActions";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
  // try {
  //   let res;
  //   if (localStorage.token) {
  //     res = await axios.get("/api/auth/me", {
  //       headers: {
  //         authorization: `Bearer ${localStorage.token}`,
  //       },
  //     });
  //   }

  //   dispatch({
  //     type: USER_LOADED,
  //     payload: res.data,
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: AUTH_ERROR,
  //   });
  // }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error.split(",");
    console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
