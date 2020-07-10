import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getPosts } from "../../actions/posts";
import Loader from "../../components/App/Loader";
import NoMorePosts from "./NoMorePosts";

import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfiniteScroll from "react-infinite-scroll-component";

//ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

import SideCard from "./SideCard"

import PostCard from "./PostCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Home = ({
  getPosts,
  posts: { posts, posts_loading, limit, offset, error, hasMore },
  isAuthenticated,
}) => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!posts_loading) return;
    getPosts(limit, offset);
  }, [getPosts]);

  window.onscroll = async (e) => {
    if (error || posts_loading || !hasMore) return;
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      // setLoading(true)
      const res = await getPosts(limit, offset);

      // if (res.status == 200) {
      //   setLoading(false);
      // }
    }
  };

  return posts_loading ? (
    <Loader />
  ) : (
    <div>
      <Grid container className={classes.root} >
        <Grid item xs={3}></Grid>
        <Grid item lg={4} md={6} sm={8} xs={12}>
          <div style={{ marginTop: "80px", marginBottom: "100px" }}>
            {posts.map((post) => (
              <div>
                <PostCard key={post.id} post={post} />
              </div>
            ))}
            {error && <div>{error} </div>}
            {!hasMore ? <NoMorePosts /> : <Loader />}
          </div>
        </Grid>
        <Grid item xs={2} style={{ marginTop: "80px"}}>
          {/* <SideCard/> */}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { getPosts })(Home);
