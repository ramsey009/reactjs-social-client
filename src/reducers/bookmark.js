import {
    GET_BOOKMARK_POST,
    GET_BOOKMARK_POST_ERROR,
    UPDATE_LIKE_FOR_BOOKMARK_LIST,
    UPDATE_LIKE_FOR_BOOKMARK_LIST_ERROR,
    UPDATE_BOOKMARK_FOR_BOOKMARK_LIST,
    UPDATE_BOOKMARK_FOR_BOOKMARK_LIST_ERROR,

    CREATE_COMMENT_BOOKMARK_POST_LIST,
    DELETE_POST_FROM_BOOKMARK_POST_LIST,
    DELETE_POST_FROM_BOOKMARK_POST_LIST_ERROR,

    POSTS_ERROR,
    UPDATE_LIKE,
    UPDATE_LIKE_ERROR,
    UPDATE_BOOKMARK,
    UPDATE_BOOKMARK_ERROR,
    DELETE_POST,
    DELETE_POST_ERROR,
    DELETE_COMMENT,
    DELETE_COMMENT_ERROR,
    CREATE_POST,
    CREATE_POST_ERROR,
    CREATE_COMMENT_LIST_POST_ERROR,
    CREATE_COMMENT_LIST_POST,
  } from "../actions/types";
  
  const initialState = {
    posts: [],
    posts_loading: true,
    error: false,
    hasMore: true,
    offset: 0,
    limit: 5,
    length: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_BOOKMARK_POST:
        return {
          ...state,
          posts: [...state.posts, ...payload.data.posts],
          offset: state.offset + state.limit,
          posts_loading: false,
          hasMore: payload.has_more,
        };
  
      case CREATE_COMMENT_BOOKMARK_POST_LIST:
        return {
          ...state,
          posts:state.posts.map((post) => 
          post.id === payload.data.post
          ?{
            ...post,
            comments_count: payload.comments_count,
            // post.comments : [ payload.data, ...post.comments]
          }
          :post
          )
        }
  
      case UPDATE_LIKE_FOR_BOOKMARK_LIST:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === payload.post_id
              ? {
                  ...post,
                  likes_count: payload.likes_count,
                  liked: payload.liked,
                }
              : post
          ),
          posts_loading: false,
        };
      case UPDATE_LIKE_FOR_BOOKMARK_LIST_ERROR:
        return {
          ...state,
          error: payload,
          update_likes_loading: false,
        };

      case UPDATE_BOOKMARK_FOR_BOOKMARK_LIST:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === payload.post_id
              ? {
                  ...post,
                  bookmarks_count: payload.bookmarks_count,
                  bookmarked: payload.bookmarked,
                }
              : post
          ),
        };
      case UPDATE_BOOKMARK_FOR_BOOKMARK_LIST_ERROR:
        return {
          ...state,
          error: payload,
          update_likes_loading: false,
        };
  
      case POSTS_ERROR:
        return {
          ...state,
          error: payload,
          update_likes_loading: false,
        };
  
      case DELETE_POST_FROM_BOOKMARK_POST_LIST:
        return {
          posts: state.posts.filter((post) => post.id !== payload.post_id),
        };
      default:
        return state;
    }
  }