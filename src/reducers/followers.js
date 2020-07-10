import {
    GET_FOLLOWER,
    GET_FOLLOWER_ERROR,
    UPDATE_CONTACTS_FOR_FOLLOWER,
    UPDATE_CONTACTS_FOR_PEOPLE_ERROR,
    
  } from "../actions/types";
  
  const initialState = {
    followers: [],
    followers_loading: true,
    followers_error:null,
    error: false,
    hasMore: true,
    limit: 5,
    offset: 0,

  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FOLLOWER:
        return {
          ...state,
          followers: [...state.followers, ...payload.followers],
          offset: state.offset + state.limit,
          hasMore: payload.has_more,
          followers_loading: false,
        };
      case GET_FOLLOWER_ERROR:
        return {
          ...state,
          followers_error: payload,
          followers_loading: false
        };

      case UPDATE_CONTACTS_FOR_FOLLOWER:
        console.log("inside reducer ---------------------------->>>>>>")
        return {
          ...state,
          followers: state.followers.map(follower => follower.follower_id === payload.id ? 
            {
              ...follower,
              is_following_this: payload.is_following_this
          }:follower
          ),
          followers_loading: false
        };
      case UPDATE_CONTACTS_FOR_PEOPLE_ERROR:
        return {
          ...state,
          error : payload,
          followers_loading: false
        }

      default:
        return state;
    }
  }
  