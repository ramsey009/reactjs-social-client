import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createCommentForDetailPost } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const CommentInput = ({
  post: { id, body },
  auth,
  createCommentForDetailPost,
}) => {
  const classes = useStyles();
  const [commentText, setCommentText] = React.useState("");

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const formData = new FormData();
  formData.append("body", commentText);
  formData.append("post", id);
  formData.append("couser", auth.couser.id);

  console.log("11111111111>>", commentText, id, auth.couser.id, formData.get("body"))



  const submitComment = () => {
    console.log("hey bro comment is submitted");
    createCommentForDetailPost(formData);
    setCommentText("");
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Write your comment.."
        value={commentText}
        onChange={handleChange}
      />

      {commentText === "" ? (
        <IconButton
          color="primary"
          style={{ marginRight: "10px" }}
          className={classes.iconButton}
          aria-label="menu"
          disabled
        >
          <SendIcon />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          onClick={submitComment}
          style={{ marginRight: "10px" }}
          className={classes.iconButton}
          aria-label="menu"
        >
          <SendIcon />
        </IconButton>
      )}
    </Paper>
  );
};

CommentInput.propTypes = {
  createCommentForDetailPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    // auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  // updateLike,
  // updateBookmark,
  // submitCommentReport,
  // deleteCommentForDetailPost,
  createCommentForDetailPost,
})(CommentInput);
