import axios from "axios";
import { 
  GET_FOLLOWING,
  GET_FOLLOWING_ERROR,
  UPDATE_CONTACTS_FOR_FOLLOWING,
  UPDATE_CONTACTS_FOR_FOLLOWING_ERROR
 } from "./types";

//get following  nnn
export const getFollowings = (username, limit, offset) => async (dispatch) => {

  const res = await axios.get(`/core/followings/${username}/?limit=${limit}&offset=${offset}`);

  if (res.status == 200) {
    dispatch({
      type: GET_FOLLOWING,
      payload: res.data,
    });
  } else {
    dispatch({
      type: GET_FOLLOWING_ERROR,
      payload: res.data,
    });
  }
};

//update contacts for following
export const updateContactsForFollowing = (username) => async (dispatch) => {
    const res = await axios.post(`/core/update-contacts/${username}/`);
  
  
    if (res.status == 200) {
      dispatch({
        type: UPDATE_CONTACTS_FOR_FOLLOWING,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_CONTACTS_FOR_FOLLOWING_ERROR,
        payload: res.data,
      });
    }
  };
