import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  PROFILE_ERROR,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
  GET_CURRENT_PROFILE,
  GET_CURRENT_PROFILE_ERROR,
  GET_TIMELINE_POST,
  GET_TIMELINE_POST_ERROR
} from "./types";



//get profile
export const getProfile = (username) => async (dispatch) => {
  const res = await axios.get(`/core/profile/${username}/`);

  if (res.status == 200) {
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } else {
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: res.data
    });
  }
}

//get timeline post
export const getTimelinePost = (username, limit, offset) => async (dispatch) => {



  console.log("----------------shaktima got the request---------------------> ", limit, offset)
  const res = await axios.get(`/core/timeline-post/${username}/?limit=${limit}&offset=${offset}`);
  // const res = await axios.get(`/core/posts/?limit=${limit}&offset=${offset}`);

  console.log("//////--?",res)

  if (res.status == 200) {
    dispatch({
      type: GET_TIMELINE_POST,
      payload: res,
    });
  } else {
    dispatch({
      type: GET_TIMELINE_POST_ERROR,
      payload: res
    });
  }
}
