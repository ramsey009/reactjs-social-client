import axios from "axios";
import { 
  GET_FOLLOWER,
  GET_FOLLOWER_ERROR,
  UPDATE_CONTACTS_FOR_FOLLOWER,
  UPDATE_CONTACTS_FOR_FOLLOWER_ERROR
 } from "./types";

//get people
export const getFollowers = (username, limit, offset ) => async (dispatch) => {

  console.log("follower reaquerst is coming bro -------------------->>")
  const res = await axios.get(`/core/followers/${username}/?limit=${limit}&offset=${offset}`);
  console.log(res)


  if (res.status == 200) {
    dispatch({
      type: GET_FOLLOWER,
      payload: res.data,
    });
  } else {
    dispatch({
      type: GET_FOLLOWER_ERROR,
      payload: res.data,
    });
  }
};


//update contacts for follower
export const updateContactsForFollower = (username) => async (dispatch) => {
  const res = await axios.post(`/core/update-contacts/${username}/`);

  console.log("--------------------->", res)


  if (res.status == 200) {
    dispatch({
      type: UPDATE_CONTACTS_FOR_FOLLOWER,
      payload: res.data,
    });
  } else {
    dispatch({
      type: UPDATE_CONTACTS_FOR_FOLLOWER_ERROR,
      payload: res.data,
    });
  }
};
