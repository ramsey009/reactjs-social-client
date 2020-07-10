import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from 'react-router-dom';


import Header from "./Header/Header";
import NotFound from "../../components/NotFound";

import Home from "../../pages/Home/Home";
import Profile from "../../pages/Profile/Profile";
import People from "../../pages/People/People";
import Post from "../../pages/Post/Post";
import Follower from "../../pages/Follower/Follower";
import Following from "../../pages/Following/Following";
import EditProfile from "../../pages/EditProfile/EditProfile";
import createPost from "../../pages/CreatePost/CreatePost"
import Bookmark from "../../pages/Bookmark/Bookmark"
import Notification from "../../pages/Notification/Notification"
import * as Routes from '../../routes';


const AppLayout = (props) => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={Routes.HOME} component={Home} />
        <Route exact path={Routes.PEOPLE} component={People} />
        <Route exact path={Routes.USER_PROFILE} component={Profile} />
        <Route exact path={Routes.POST} component={Post} />,
        <Route exact path="/profile/edit" component = {EditProfile}/>,
        <Route exact path="/followers/:username" component = {Follower}/>,
        <Route exact path="/followings/:username" component = {Following}/>,
        <Route exact path="/create/post" component = {createPost}/>,
        <Route exact path="/post/:id" component = {Post}/>,
        <Route exact path="/bookmarks/post" component = {Bookmark}/>,
        <Route exact path="/username/notification" component = {Notification}/>,




        <Route component={NotFound} />
      </Switch>
    </>
  );
};

AppLayout.propTypes = {};

export default AppLayout;
