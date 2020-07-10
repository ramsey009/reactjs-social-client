import React, { Fragment, Profiler } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
// import Moment from "react-moment";
import { connect } from "react-redux";
import { updateContactsForFollower } from "../../actions/follower";

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
    maxWidth: 600,
    marginBottom: "5px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const FollowerCard = ({
  updateContactsForFollower,
  auth,
  follower: {
    id,
    username,
    fullname,
    is_following_this,
    follower_id,
    avatar
  }
}) => {
  const classes = useStyles();

  console.log("KKKKKKKKKKKKKKKKKKKKK", is_following_this, username)

  const avatar_link = "http://127.0.0.1:8000/media/"+avatar
  const full_username = "@"+username

  return (
    <Card className={classes.root} style={{marginBottom:"10px"}}>
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
              onClick={e => updateContactsForFollower(username)}
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
              onClick={e => updateContactsForFollower(username)}
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

FollowerCard.propTypes = {
  updateContactsForFollower: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {updateContactsForFollower })(FollowerCard);
