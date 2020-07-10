import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from './profile';
import editProfile from './editProfile'
import timeLinePost from './timeLinePost'


import posts from "./posts";
import post from "./post";
import people from "./people";
import followers from './followers'
import followings from './followings'
// import myposts from './myposts'
// import followinglist from './followinglist'
import comments from './comments'
// import like from './like'
import bookmark from './bookmark'

export default combineReducers({
  alert,
  auth,
  profile,
  editProfile,
  post,
  posts,
  timeLinePost,
//   post,
  people,
  followers,
  followings,
//   myposts,
//   followinglist,
  comments,
  //   like,
    bookmark
});
