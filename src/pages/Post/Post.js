import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

import { getPost } from "../../actions/post";
import Loader from "../../components/App/Loader";
import CommentCard from "./CommentCard";

import { connect } from "react-redux";
import Moment from "react-moment";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { MemoryRouter as Router } from "react-router";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Scrollbars } from "react-custom-scrollbars";

import CommentInput from "./CommentInput";

import { updateLikeDetailPost } from "../../actions/post";
import { updateBookmarkDetailPost } from "../../actions/post";
import { submitPostReport } from "../../actions/report";
import { deletePost } from "../../actions/posts";
import { getComments } from "../../actions/comments";

// import PostCard from "./PostCard";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  // commentScroll{

  // }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Post = ({
  getPost,
  post: { post_loading, post },
  comments: isAuthenticated,
  auth,
  match,
  updateLikeDetailPost,
  updateBookmarkDetailPost,
  getComments,
  submitPostReport,
  deletePost,
  comments: {
    comments,
    comments_loading,
    comments_count,
    limit,
    offset,
    error,
    hasMore,
  },
}) => {
  const classes = useStyles();

  useEffect(() => {
    getPost(match.params.id);
    getComments(match.params.id, limit, offset);
  }, [getPost, getComments]);

  console.log("****************************************", hasMore);

  const post_id = match.params.id;

  // elem.onscroll = () =>{
  //   console.log("kam kar rha hai bhai")
  // }

  //comment expand
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(true);
  };

  //card menu option
  const [cardMenu, setCardMenu] = React.useState(null);
  const handleClickCard = (event) => {
    setCardMenu(event.currentTarget);
  };
  const handleCloseCardMenu = () => {
    setCardMenu(null);
  };

  //handle both changes card menu and dialog
  const handleBothCardMenuAndDialog = (event) => {
    handleCloseCardMenu(event);
    handleClickOpen(event);
  };

  //handle report type select radio button
  const [reportType, setReportType] = React.useState("0");

  const handleReportTypeSelect = (event) => {
    setReportType(event.target.value);
  };

  // report on post submission
  const formData = new FormData();
  formData.append("reporter", auth.couser.id);
  formData.append("report_type", reportType);
  formData.append("post", post.id);
  // formData.append("couser", couser_id);
  // formData.append("comment", "post")
  formData.append("entity_type", "post");

  //after menu dialog option
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const postReportClose = () => {
    setOpen(false);
  };
  const postReportSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    submitPostReport(formData);
  };

  //delete a post
  const [openPostDeleteDialog, setOpenPostDeleteDialog] = React.useState(false);

  const handleOpenDeletePostDialog = (event) => {
    setOpenPostDeleteDialog(true);
    handleCloseCardMenu(event);
  };

  const handleCloseDeletePostDialog = () => {
    setOpenPostDeleteDialog(false);
  };

  const handleDeletePostDialog = (e) => {
    console.log("************************************************************");
    e.preventDefault();
    setOpenPostDeleteDialog(false);
    deletePost(post.id);
  };

  let picture_link = "";
  if (post.picture != "") {
    picture_link = "http://127.0.0.1:8000" + post.picture;
  }

  console.log(picture_link, post.picture);

  return post_loading ? (
    <Loader />
  ) : (
    <div style={{ marginBottom: "100px" }}>
      <Grid container className={classes.root}>
        <Grid item xs={3}></Grid>
        <Grid item lg={4} md={6} sm={8} xs={12}>
          <div style={{ marginTop: "60px" }}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <div>
                    <IconButton
                      aria-label="settings"
                      onClick={handleClickCard}
                      aria-controls="card-menu"
                      aria-haspopup="true"
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      id="card-menu"
                      anchorEl={cardMenu}
                      keepMounted
                      open={Boolean(cardMenu)}
                      onClose={handleCloseCardMenu}
                    >
                      {auth.couser.id != post.couser ? (
                        <div>
                          {/* <MenuItem onClick= { (e) => handleCloseCardMenu, handleClickOpen }>Report</MenuItem> */}
                          <MenuItem onClick={handleBothCardMenuAndDialog}>
                            Report
                          </MenuItem>

                          <Dialog
                            onClose={postReportClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                          >
                            <DialogTitle
                              id="customized-dialog-title"
                              onClose={postReportClose}
                            >
                              Report on Post
                            </DialogTitle>
                            <DialogContent dividers>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                  aria-label="gender"
                                  name="gender1"
                                  value={reportType}
                                  onChange={handleReportTypeSelect}
                                >
                                  <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Sexual content"
                                  />
                                  <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    label="Violent or repulsive content"
                                  />
                                  <FormControlLabel
                                    value="3"
                                    control={<Radio />}
                                    label="Hateful or abusive content"
                                  />
                                  <FormControlLabel
                                    value="4"
                                    control={<Radio />}
                                    label="Child abuse"
                                  />
                                  <FormControlLabel
                                    value="5"
                                    control={<Radio />}
                                    label="Spam or misleading"
                                  />
                                  <FormControlLabel
                                    value="6"
                                    control={<Radio />}
                                    label="Other"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </DialogContent>
                            <DialogActions>
                              {reportType != "0" ? (
                                <Button
                                  autoFocus
                                  onClick={postReportSubmit}
                                  color="primary"
                                >
                                  Report
                                </Button>
                              ) : (
                                <Button
                                  autoFocus
                                  disabled
                                  onClick={postReportSubmit}
                                  color="primary"
                                >
                                  Report
                                </Button>
                              )}
                            </DialogActions>
                          </Dialog>
                        </div>
                      ) : (
                        <div>
                          <MenuItem onClick={handleOpenDeletePostDialog}>
                            Delete
                          </MenuItem>

                          <Dialog
                            open={openPostDeleteDialog}
                            onClose={handleCloseDeletePostDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Delete Post"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Once you delete your post it can not be
                                retrieved.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleCloseDeletePostDialog}
                                color="primary"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleDeletePostDialog}
                                color="primary"
                                autoFocus
                              >
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      )}
                    </Menu>
                  </div>
                }
                title={
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    {post.couser_fullname}
                  </Link>
                }
                subheader={<Moment fromNow>{post.created_at}</Moment>}
              />
              <Divider />

              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
              {picture_link != "" && (
                <CardMedia
                  className={classes.media}
                  image={picture_link}
                  title="Paella dish"
                />
              )}
              <Divider />

              <CardActions>
                <Grid container spacing={3} style={{ textAlign: "center" }}>
                  <Grid item xs>
                    {!auth.auth_loading && post.liked ? (
                      <Tooltip title="dislike" placement="top" arrow>
                        <Button
                          onClick={(e) => updateLikeDetailPost(post.id)}
                          size="small"
                          color="primary"
                          style={{ width: "100%" }}
                        >
                          <ThumbUpAltIcon />
                          <div style={{ marginLeft: "15px" }}>
                            {post.likes_count}
                          </div>
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="like" placement="top" arrow>
                        <Button
                          onClick={(e) => updateLikeDetailPost(post.id)}
                          size="small"
                          color="primary"
                          style={{ width: "100%" }}
                        >
                          <ThumbUpAltOutlinedIcon />
                          <div style={{ marginLeft: "15px" }}>
                            {post.likes_count}
                          </div>
                        </Button>
                      </Tooltip>
                    )}
                  </Grid>

                  <Grid item xs>
                    <Button
                      size="small"
                      color="primary"
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      style={{ width: "100%" }}
                    >
                      <ModeCommentOutlinedIcon />
                      <div style={{ marginLeft: "15px" }}>{comments_count}</div>
                    </Button>
                  </Grid>

                  <Grid item xs>
                    {!auth.auth_loading && post.bookmarked ? (
                      <Tooltip title="unbookmark" placement="top" arrow>
                        <Button
                          onClick={(e) => updateBookmarkDetailPost(post.id)}
                          size="small"
                          color="primary"
                          style={{ width: "100%" }}
                        >
                          <BookmarkOutlinedIcon />
                          <div style={{ marginLeft: "15px" }}>
                            {post.bookmarks_count}
                          </div>
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="bookmark" placement="top" arrow>
                        <Button
                          onClick={(e) => updateBookmarkDetailPost(post.id)}
                          size="small"
                          color="primary"
                          style={{ width: "100%" }}
                        >
                          <BookmarkBorderOutlinedIcon />
                          <div style={{ marginLeft: "15px" }}>
                            {post.bookmarks_count}
                          </div>
                        </Button>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              </CardActions>
              <Divider />
              <CommentInput key={post.id} post={post} auth={auth} />
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {/* <div className={classes.commentScroll} style={{ maxHeight: 400, overflow: "auto" , paddingBottom:"30px"}}> */}
                
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                  {hasMore == true && (
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <Button
                        onClick={(e) => getComments(post_id, limit, offset)}
                        size="small"
                        color="primary"
                        style={{ width: "25%" }}
                      >
                        <AddCircleOutlineIcon />
                      </Button>
                    </div>
                  )}
                {/* </div> */}
              </Collapse>
            </Card>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  updateLikeDetailPost: PropTypes.func.isRequired,
  updateBookmarkDetailPost: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  submitPostReport: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
    comments: state.comments,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {
  getPost,
  updateLikeDetailPost,
  updateBookmarkDetailPost,
  getComments,
  submitPostReport,
  deletePost,
})(Post);
