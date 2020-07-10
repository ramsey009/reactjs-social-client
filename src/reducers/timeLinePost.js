import {
    GET_TIMELINE_POST,
    GET_TIMELINE_POST_ERROR
  } from "../actions/types";
  
  const initialState = {
    posts: [],
    posts_loading: true,
    error: false,
    hasMore: true,
    offset: 0,
    limit: 5,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_TIMELINE_POST:
        return {
          ...state,
          posts: [...state.posts, ...payload.data.posts],
          offset: state.offset + state.limit,
          posts_loading: false,
          hasMore: payload.data.has_more,
        };
  
      case GET_TIMELINE_POST_ERROR:
        return {
          ...state,
          error: payload,
          update_likes_loading: false,
        };
      default:
        return state;
    }
  }
  