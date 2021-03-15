import axios from "axios";
import { setAlert } from "../alert/alertActions";

import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "./profileTypes";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const clearProfile = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
