import axios from "axios";
import { 
  GET_PEOPLE,
  GET_PEOPLE_ERROR,
  GET_PROFILE,
  UPDATE_CONTACTS_FOR_PEOPLE,
  UPDATE_CONTACTS_FOR_PEOPLE_ERROR
 } from "./types";

//get people
export const getPeople = (limit, offset) => async (dispatch) => {

  //put a try catch in api calling
  const res = await axios.get(`/core/people/?limit=${limit}&offset=${offset}`);
  console.log(res)

  if (res.status == 200) {
    console.log("valid")
    dispatch({
      type: GET_PEOPLE,
      payload: res.data,
    });
  } else {
    console.log("invalid")
    dispatch({
      type: GET_PEOPLE_ERROR,
      payload: res.data,
    });
  }
};

//update contacts for people
export const updateContactsForPeople = (username) => async (dispatch) => {
  const res = await axios.post(`/core/update-contacts/${username}/`);


  if (res.status == 200) {
    dispatch({
      type: UPDATE_CONTACTS_FOR_PEOPLE,
      payload: res.data,
    });
  } else {
    dispatch({
      type: UPDATE_CONTACTS_FOR_PEOPLE_ERROR,
      payload: res.data,
    });
  }
};
