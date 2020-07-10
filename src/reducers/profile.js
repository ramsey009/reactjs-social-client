import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  PROFILE_ERROR,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
  GET_CURRENT_PROFILE,
  GET_CURRENT_PROFILE_ERROR
} from "../actions/types";

const initialState = {
  profile: {},
  profile_loading: true,
  profile_info: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        profile_loading: false
      };

    case GET_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile_loading: false
      };

    default:
      return state;
  }
}
