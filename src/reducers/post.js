import {
  GET_POST,
  GET_POST_ERROR,
  UPDATE_LIKE_DETAIL_POST,
  UPDATE_LIKE_DETAIL_POST_ERROR,
  UPDATE_BOOKMARK_DETAIL_POST_ERROR,
  UPDATE_BOOKMARK_DETAIL_POST,
  GET_COMMENTS_DETAIL_POST,
  GET_COMMENTS_DETAIL_POST_ERROR,
  DELETE_COMMENT_DETAIL_POST,
  DELETE_COMMENT_DETAIL_POST_ERROR,
  CREATE_COMMENT_DETAIL_POST,
  CREATE_COMMENT_DETAIL_POST_ERROR,
} from "../actions/types";

const initialState = {
  post: {},
  post_loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case CREATE_COMMENT_DETAIL_POST:
    //   return {
    //     ...state,
    //     comments_count: payload.comments_count,
    //     comments: [payload.data, ...state.comments],
    //   };

    case GET_POST:
      return {
        ...state,
        post: payload,
        post_loading: false,
      };

    case GET_POST_ERROR:
      return {
        ...state,
        post_error: payload,
        post_loading: false,
      };

    // case UPDATE_LIKE_DETAIL_POST:
    // return{
    //   ...state,
    //   likes_count: payload.likes_count,
    //   liked: payload.liked
    //   }
    // };

    case UPDATE_LIKE_DETAIL_POST:
      return {
        ...state,
        post: {
          ...state.post,
          likes_count: payload.likes_count,
          liked: payload.liked,
        },

        post_loading: false,
      };

    case UPDATE_BOOKMARK_DETAIL_POST:
      return {
        ...state,
        post: {
          ...state.post,
          bookmarks_count: payload.bookmarks_count,
          bookmarked: payload.bookmarked,
        },

        post_loading: false,
      };
    // case GET_COMMENTS_DETAIL_POST:
    //   return {
    //     ...state,
    //     comments: payload.comments,
    //     comments_count: payload.comments_count,
    //     comments_loading: false,
    //   };

    // case DELETE_COMMENT_DETAIL_POST:
    //   return {
    //     ...state,
    //     comments_count: payload.comments_count,
    //     comments: state.comments.filter(
    //       (comment) => comment.id !== payload.comment_id
    //     ),
    //     comments_loading: false,
    //   };

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

    // case UPDATE_LIKE_DETAIL_POST_ERROR:
    //   return{
    //     ...state
    //   }

    default:
      return state;
  }
}
