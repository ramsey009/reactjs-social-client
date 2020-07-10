import {
    GET_FOLLOWING,
    GET_FOLLOWING_ERROR,
    UPDATE_CONTACTS_FOR_FOLLOWING,
    UPDATE_CONTACTS_FOR_FOLLOWING_ERROR,
    
  } from "../actions/types";
  
  const initialState = {
    followings: [],
    followings_loading: true,
    followings_error:null,
    error: false,
    hasMore: true,
    offset:0,
    limit:10,
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FOLLOWING:
        return {
          ...state,
          followings: [...state.followings, ...payload.followings],
          offset: state.offset + state.limit,
          followings_loading: false,
          hasMore:payload.has_more,
        };
      case GET_FOLLOWING_ERROR:
        return {
          ...state,
          followings_error: payload,
          followings_loading: false
        };

    case UPDATE_CONTACTS_FOR_FOLLOWING:
        return {
            ...state,
            followings: state.followings.map(following => following.following_id === payload.id ? 
            {
                ...following,
                is_following_this: payload.is_following_this
            }:following
            ),
            followings_loading: false
        };
        case UPDATE_CONTACTS_FOR_FOLLOWING_ERROR:
        return {
            ...state,
            error : payload,
            followings_loading: false
        }
        
      default:
        return state;
    }
  }
  