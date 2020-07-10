import {
  GET_POSTS,
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
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...payload.posts],
        offset: state.offset + state.limit,
        posts_loading: false,
        hasMore: payload.has_more,
      };

    case CREATE_COMMENT_LIST_POST:
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

    case UPDATE_LIKE:
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
    case UPDATE_LIKE_ERROR:
      return {
        ...state,
        error: payload,
        update_likes_loading: false,
      };

    case UPDATE_BOOKMARK:
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
    case UPDATE_BOOKMARK_ERROR:
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

    case DELETE_POST:
      return {
        posts: state.posts.filter((post) => post.id !== payload.post_id),
      };

    // ...state,
    // posts: state.posts.map((post) =>
    //   post.id === payload.post_id
    //     ? {
    //         ...post,
    //         likes_count: payload.likes_count,
    //         liked: payload.liked,
    //       }
    //     : post

    // const DELETE_COMMENT:
    //   return {
    //     posts.map((post) => post.id === payload.post_id ? {
    //       post.comments.map((comment) => comment.id === payload.comment_id)

    //     }:post
    //     )
    //   };

    //   case HANDLE_COMMENTBOX:
    //     if (payload.is_active_value == true) {
    //       return {
    //         ...state,
    //         posts: state.posts.map(post =>
    //           post.id === payload.id
    //             ? { ...post, is_active: payload.is_active_value }
    //             : { ...post, is_active: false}
    //         )
    //       };
    //     } else {
    //       return {
    //         ...state,
    //         posts: state.posts.map(post =>
    //           post.id === payload.id
    //             ? { ...post, is_active: payload.is_active_value }
    //             : { ...post}
    //         )
    //       };
    //     }

    default:
      return state;
  }
}
