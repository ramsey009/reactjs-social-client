import {
    GET_EDIT_PROFILE,
    GET_EDIT_PROFILE_ERROR,
    EDIT_PROFILE,
    EDIT_PROFILE_ERROR
  } from "../actions/types";
  
  const initialState = {
    editProfile: {},
    get_edit_profile_loading: true,
    edit_profile_info: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_EDIT_PROFILE:
        return {
          ...state,
          editProfile: payload,
          get_edit_profile_loading: false
        };
  
      case GET_EDIT_PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          get_edit_profile_loading: false
        };
      case EDIT_PROFILE:
        return{
          ...state,
          editProfile: payload,
          get_edit_profile_loading: false

        }
      case EDIT_PROFILE_ERROR:
        return{
          ...state,
          error: payload,
          get_edit_profile_loading: false
        }

      default:
        return state;
    }
  }
  