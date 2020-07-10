import axios from "axios";
import { setAlert } from "./alert";
import { 
  GET_EDIT_PROFILE,
  GET_EDIT_PROFILE_ERROR,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR
 } from "./types";

//get edit profile
export const getEditProfile = () => async (dispatch) => {
  const res = await axios.get(`/core/edit-profile/`);

  if (res.status == 200) {
    dispatch({
      type: GET_EDIT_PROFILE,
      payload: res.data,
    });
  } else {
    dispatch({
      type: GET_EDIT_PROFILE_ERROR,
      payload: res.data,
    });
  }
};

// post edit profile
export const postEditProfile = (mobile, dob, place, about, avatar) => async (
  dispatch
) => {
  let form_data = new FormData();
  form_data.append("mobile", mobile);
  form_data.append("place", place);
  form_data.append("about", about);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.put("/core/edit-profile/", form_data, config);

  if (res.status == 200) {
    dispatch({
      type: EDIT_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Profile Saved", "success"));
  } else {
    dispatch({
      type: EDIT_PROFILE_ERROR,
      payload: null,
    });
  }
};


//upload profile picture
export const uploadProfilePicture = (formData) => async dispatch => {

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  const res = await axios.put("/core/edit-profile/", formData, config);

  if (res.status == 200) {
    dispatch({
      type: EDIT_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Profile Saved", "success"));
  } else {
    dispatch({
      type: EDIT_PROFILE_ERROR,
      payload: null,
    });
  }
};

