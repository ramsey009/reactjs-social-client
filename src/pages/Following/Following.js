import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Loader from "../../components/App/Loader";
import { connect } from "react-redux";
import { getFollowings } from "../../actions/following";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowingCard from "./FollowingCard";
import NoMoreFollowings from "./NoMoreFollowings"

import { makeStyles } from "@material-ui/core/styles";

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

const Following = ({
  getFollowings,
  followings: { followings, followings_loading, limit, offset, error, hasMore },
  isAuthenticated,
  match,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!followings_loading) return;
    getFollowings(match.params.username, limit, offset);
  }, [getFollowings]);

  window.onscroll = async (e) => {
    if (error || followings_loading || !hasMore) return;
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      const res = await getFollowings(match.params.username, limit, offset);
    }
  };

  return followings_loading ? (
    <Loader />
  ) : (
    <div className={classes.root} style={{ padding: 5 }}>
      <Grid container spacing={1}>
        <Hidden smDown>
          <Grid item md={3}></Grid>
        </Hidden>

        <Grid item xs={12} sm={12} md={4}>
          <div style={{ marginTop: "100px", marginBottom: "40px" }}>
            {followings.map((following) => (
              <div style={{marginBottom:"10px"}}>
                <FollowingCard
                  key={following.following_id}
                  following={following}
                />
              </div>
            ))}
            {error && <div>{error} </div>}
            {!hasMore ? <NoMoreFollowings /> : <Loader />}
          </div>
        
        </Grid>

        <Hidden smDown>
          <Grid item md={4}></Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Following.propTypes = {
  getFollowings: PropTypes.func.isRequired,
  followings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    followings: state.followings,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { getFollowings })(Following);
