import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIKE,
  UPDATE_LIKE_ERROR,
  UPDATE_BOOKMARK,
  UPDATE_BOOKMARK_ERROR,
  CREATE_POST,
  CREATE_POST_ERROR,
  DELETE_POST,
  DELETE_POST_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
  CREATE_COMMENT_LIST_POST,
  CREATE_COMMENT_LIST_POST_ERROR,

} from "./types";

import { Redirect } from "react-router-dom";




//COMMENT ON THE POST LIST VIEW
export const createCommentPostList = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.post("/core/comment-post-list/", formData, config);

  console.log("_______________)))))))))))", res)


  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: CREATE_COMMENT_LIST_POST,
      payload: res.data,
    });
    dispatch(setAlert("commented successfuly", "success"));
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: CREATE_COMMENT_LIST_POST_ERROR,
      payload: res.data,
    });
    dispatch(setAlert("Unable to comment on  post, please try after some time", "error"));

  }
};

//get all the posts
export const getPosts = (limit, offset) => async (dispatch) => {
  
  //put a try catch in api calling
  const res = await axios.get(`/core/posts/?limit=${limit}&offset=${offset}`);
  console.log(res);

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: POSTS_ERROR,
      payload: res.data,
    });
  }
};

//update like
export const updateLike = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //put a try catch in api calling
  const res = await axios.post(`/core/update-like/${post_id}/`);

  console.log(res);
  dispatch(setAlert("like updated", "success"))

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: UPDATE_LIKE,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: UPDATE_LIKE_ERROR,
      payload: res.data,
    });
  }
};

//update bookmark
export const updateBookmark = (post_id) => async (dispatch) => {
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
      type: UPDATE_BOOKMARK,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: UPDATE_BOOKMARK_ERROR,
      payload: res.data,
    });
  }
};

//create post
export const createPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.post("/core/posts/", formData, config);

  console.log("_______________)))))))))))", res)


  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(setAlert("Unable to delete post, please try after some time", "error"));
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: CREATE_POST_ERROR,
      payload: res.data,
    });
    dispatch(setAlert("Unable to delete post, please try after some time", "error"));
  }
};


//delete post
export const deletePost = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.delete(`/core/posts/${post_id}/`, config);

  console.log("_______________)))))))))))", res)

  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: DELETE_POST_ERROR,
      payload: res.data,
    });
  }
};

//DELETE COMMENT
export const deleteComment = (comment_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.delete(`/core/comments/${comment_id}/`, config);

  console.log("_______________)))))))))))", res)

  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: DELETE_COMMENT_ERROR,
      payload: res.data,
    });
  }
};





