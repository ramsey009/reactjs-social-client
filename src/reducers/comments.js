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
  comments: [],
  comments_loading: true,
  error: false,
  hasMore: true,
  offset: 0,
  limit: 5,
  comments_count: null,
  comments_error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COMMENT_DETAIL_POST:
      return {
        ...state,
        comments_count: payload.comments_count,
        comments: [payload.data, ...state.comments],
      };

    case GET_COMMENTS_DETAIL_POST:
      return {
        ...state,
        comments: [...state.comments, ...payload.comments],
        offset: state.offset + state.limit,
        comments_loading: true,
        comments_count: payload.comments_count,
        hasMore: payload.has_more,
      };

    case DELETE_COMMENT_DETAIL_POST:
      return {
        ...state,
        comments_count: payload.comments_count,
        comments: state.comments.filter(
          (comment) => comment.id !== payload.comment_id
        ),
        comments_loading: false,
      };

    default:
      return state;
  }
}
