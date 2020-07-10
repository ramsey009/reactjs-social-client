import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_POST,
    GET_POST_ERROR,
    UPDATE_BOOKMARK_DETAIL_POST,
    UPDATE_BOOKMARK_DETAIL_POST_ERROR,
    UPDATE_LIKE_DETAIL_POST,
    UPDATE_LIKE_DETAIL_POST_ERROR,
    GET_COMMENTS_DETAIL_POST,
    GET_COMMENTS_DETAIL_POST_ERROR,
    DELETE_COMMENT_DETAIL_POST,
    DELETE_COMMENT_DETAIL_POST_ERROR,
    CREATE_COMMENT_DETAIL_POST,
    CREATE_COMMENT_DETAIL_POST_ERROR

} from "./types";

import { Redirect } from "react-router-dom";

//get single post
export const getPost = (post_id) => async (dispatch) => {

  //put a try catch in api calling
  const res = await axios.get(`/core/post/${post_id}/`);

  console.log(res);

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: GET_POST_ERROR,
      payload: res.data,
    });
  }
};


//update like for single post
export const updateLikeDetailPost = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //put a try catch in api calling
  const res = await axios.post(`/core/update-like/${post_id}/`);

  console.log(res);

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: UPDATE_LIKE_DETAIL_POST,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: UPDATE_LIKE_DETAIL_POST_ERROR,
      payload: res.data,
    });
  }
};


//UPDATE BOOKMARK FOR DETAIL POST
export const updateBookmarkDetailPost = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //put a try catch in api calling
  const res = await axios.post(`/core/update-bookmark/${post_id}/`);

  console.log(res);

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: UPDATE_BOOKMARK_DETAIL_POST,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: UPDATE_BOOKMARK_DETAIL_POST_ERROR,
      payload: res.data,
    });
  }
};

// GET COMMENTS FOR DETAIL POST
export const getComments = (post_id, limit, offset) => async (dispatch) => {

    console.log("function is called----------------------->", limit, offset)

  //put a try catch in api calling
  const res = await axios.get(`/core/comment/${post_id}/?limit=${limit}&offset=${offset}`);

  console.log(res);

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: GET_COMMENTS_DETAIL_POST,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: GET_COMMENTS_DETAIL_POST_ERROR,
      payload: res.data,
    });
  }
};

//DELETE COMMENT FOR DETAIL POST
//DELETE COMMENT
export const deleteCommentForDetailPost = (comment_id) => async (dispatch) => {

  console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.delete(`/core/comment-detail-post/${comment_id}/`, config);

  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: DELETE_COMMENT_DETAIL_POST,
      payload: res.data,
    });
    dispatch(setAlert("Comment deleted successfully", "success"))
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: DELETE_COMMENT_DETAIL_POST_ERROR,
      payload: res.data,
    });
  }
};


//CREATE COMMENT FOR DETAIL POST
//CREATE COMMENT
export const createCommentForDetailPost = (formData) => async (dispatch) => {

  console.log("inside action",formData.get("body"))
  console.log("inside action",formData.get("post"))
  console.log("inside action",formData.get("couser"))


  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.post(`/core/add-comment-detail-post/`,formData, config );

  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: CREATE_COMMENT_DETAIL_POST,
      payload: res.data,
    });
    dispatch(setAlert("Commented  successfully", "success"))
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: CREATE_COMMENT_DETAIL_POST_ERROR,
      payload: res.data,
    });
    dispatch(setAlert("unable to add comment", "error"))
  }
};


