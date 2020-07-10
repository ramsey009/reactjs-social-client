import React, { Fragment, Profiler } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
// import Moment from "react-moment";
import { connect } from "react-redux";
import { updateContactsForFollowing } from "../../actions/following";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

const FollowingCard = ({
  updateContactsForFollowing,
  auth,
  following: {
    id,
    username,
    fullname,
    is_following_this,
    following_id,
    avatar
  }
}) => {
  const classes = useStyles();

  const avatar_link = "http://127.0.0.1:8000/media/"+avatar
  const full_username = "@"+username

  
  return (
    <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}
        src = {avatar_link}
        >
        </Avatar>
      }
      action={
        !auth.auth_loading &&
        is_following_this ? (
        <Button
          onClick={e => updateContactsForFollowing(username)}
          size="small"
          className={classes.margin}
          style={{ marginTop: "10px", marginRight: "20px" }}
          size="small"
          color="primary"
          variant="contained"
        >
          Unfollow
        </Button>
        ):(
          <Button
          onClick={e => updateContactsForFollowing(username)}
          size="small"
          className={classes.margin}
          style={{ marginTop: "10px", marginRight: "20px" }}
          size="small"
          color="primary"
          // variant="outlined"
          variant="contained"
        >
          Follow
        </Button>
        )
      }
      title={fullname}
      subheader={full_username}
    />
  </Card>
  );
};

FollowingCard.propTypes = {
    updateContactsForFollowing: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {updateContactsForFollowing })(FollowingCard);
