import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_BOOKMARK_POST,
  GET_BOOKMARK_POST_ERROR,

  UPDATE_LIKE_FOR_BOOKMARK_LIST,
  UPDATE_LIKE_FOR_BOOKMARK_LIST_ERROR,

  UPDATE_BOOKMARK_FOR_BOOKMARK_LIST,
  UPDATE_BOOKMARK_FOR_BOOKMARK_LIST_ERROR,

  CREATE_COMMENT_BOOKMARK_POST_LIST,
  CREATE_COMMENT_BOOKMARK_POST_LIST_ERROR,

  DELETE_POST_FROM_BOOKMARK_POST_LIST,
  DELETE_POST_FROM_BOOKMARK_POST_LIST_ERROR,

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


//GET ALL THE BOOKMARK POST
export const getBookmarkPosts = (limit, offset) => async (dispatch) => {

    console.log("hey bro i got the request===============>>>>>")
  
    //put a try catch in api calling
    const res = await axios.get(`/core/bookmark-posts-list/?limit=${limit}&offset=${offset}`);
    console.log("hahahah---->",res);
  
    if (res.status === 200) {
      console.log("valid point");
      dispatch({
        type: GET_BOOKMARK_POST,
        payload: res,
      });
      return(res)
    } else {
      console.log("invalid point");
      dispatch({
        type: GET_BOOKMARK_POST_ERROR,
        payload: res,
      });
    }
  };


//COMMENT ON BOOKMARKED POST LIST VIEW
export const createCommentOnBookmarkPostList = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.post("/core/comment-on-bookmark-post-list/", formData, config);

  console.log("_______________)))))))))))", res)


  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: CREATE_COMMENT_BOOKMARK_POST_LIST,
      payload: res.data,
    });
    dispatch(setAlert("commented successfuly", "success"));
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: CREATE_COMMENT_BOOKMARK_POST_LIST,
      payload: res.data,
    });
    dispatch(setAlert("Unable to comment on  post, please try after some time", "error"));

  }
};


//UPDATE LIKE ON BOOKMARK POST LIST
export const updateLikeForBookmarkList = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //put a try catch in api calling
  const res = await axios.post(`/core/update-like-for-bookmark-list/${post_id}/`);

  console.log(res);
  dispatch(setAlert("like updated", "success"))

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: UPDATE_LIKE_FOR_BOOKMARK_LIST,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: UPDATE_LIKE_FOR_BOOKMARK_LIST,
      payload: res.data,
    });
  }
};


//UPDATE BOOKMARK FOR BOOKMARK LIST
export const updateBookmarkForBookmarkList = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //put a try catch in api calling{auth.couser.id} == {couser_id}
  const res = await axios.post(`/core/update-bookmark-for-bookmark-list/${post_id}/`);

  console.log(res);

  if (res.status === 200) {
    console.log("valid point");
    dispatch({
      type: UPDATE_BOOKMARK_FOR_BOOKMARK_LIST,
      payload: res.data,
    });
  } else {
    console.log("invalid point");
    dispatch({
      type: UPDATE_BOOKMARK_FOR_BOOKMARK_LIST,
      payload: res.data,
    });
  }
};



//DELETE POST FROM BOOKMARK POST LIST
export const deletePostFromBookmarkPostList = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.delete(`/core/delete-post-from-bookmark-post-list/${post_id}/`, config);

  console.log("_______________)))))))))))", res)

  if (res.status == 200) {
    console.log("valid point");
    dispatch({
      type: DELETE_POST_FROM_BOOKMARK_POST_LIST,
      payload: res.data,
    });
    return(res)
  } else {
    console.log("invalid point");
    dispatch({
      type: DELETE_POST_FROM_BOOKMARK_POST_LIST,
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


