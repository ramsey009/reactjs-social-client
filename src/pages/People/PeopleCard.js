import React, { Fragment, Profiler } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
// import Moment from "react-moment";
import { connect } from "react-redux";
import { updateContactsForPeople } from "../../actions/people";

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

const PeopleCard = ({
  updateContactsForPeople,
  auth,
  person: {
    id,
    username,
    fullname,
    followings_count,
    followers_count,
    posts_count,
    bookmarks_count,
    followers_list,
    is_following_this,
    avatar
  }
}) => {
  const classes = useStyles();

  // http://127.0.0.1:8000/media/images/download93092.jpeg

  const avatar_link = "http://127.0.0.1:8000/media/"+avatar
  const full_username = "@"+username

  return (

    <Card className={classes.root}>


        <CardHeader
          avatar={
            <Link to={`/${username}`} style={{ textDecoration: "None" }}>

            <Avatar aria-label="recipe" className={classes.avatar}
            src = {avatar_link}
            >
            </Avatar>
            </Link>
          }
          action={
            !auth.auth_loading &&
            is_following_this ? (
            <Button
              onClick={e => updateContactsForPeople(username)}
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
              onClick={e => updateContactsForPeople(username)}
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
          
          title={ 
            <Link to={`/${username}`} style={{ textDecoration: "None" }}>
            {fullname}
            </Link>
            }

          subheader={
            <Link to={`/${username}`} style={{ textDecoration: "None" }}>
            {full_username}
            </Link>
            }


        />

      </Card>

  );
};

PeopleCard.propTypes = {
  updateContactsForPeople: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {updateContactsForPeople })(PeopleCard);
