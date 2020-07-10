import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Loader from "../../components/App/Loader";
import { connect } from "react-redux";
import { getFollowers } from "../../actions/follower";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowerCard from "./FollowerCard";
import NoMoreFollowers from "./NoMoreFollowers"


import { makeStyles } from "@material-ui/core/styles";
import NoMoreFollowings from "../Following/NoMoreFollowings";

// ui variable
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Follower = ({
  getFollowers,
  followers: { followers, followers_loading, limit, offset, error, hasMore },
  isAuthenticated,
  match,
}) => {

  const classes = useStyles();

  useEffect(() => {
    if (!followers_loading) return;
    getFollowers(match.params.username, limit, offset);
  }, [getFollowers]);

  window.onscroll = async (e) => {
    if (error || followers_loading || !hasMore) return;
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      // setLoading(true)
      const res = await getFollowers(match.params.username, limit, offset);

      // if (res.status == 200) {
      //   setLoading(false);
      // }
    }
  };


  return followers_loading ? (
    <Loader />
  ) : (
    <div className={classes.root} style={{ padding: 5 }}>
      <Grid container spacing={1}>
        <Hidden smDown>
          <Grid item md={3}></Grid>
        </Hidden>

        <Grid item xs={12} sm={12} md={4}>
            {followers.map((follower) => (
              <FollowerCard key={follower.follower_id} follower={follower} />
            ))}
            {error && <div>{error} </div>}
            {!hasMore ? <NoMoreFollowings /> : <Loader />}
        </Grid>

        <Hidden smDown>
          <Grid item md={4}></Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Follower.propTypes = {
  getFollowers: PropTypes.func.isRequired,
  followers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    followers: state.followers,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { getFollowers })(Follower);
