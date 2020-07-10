import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TimelinePostCard from "./TimelinePostCard";
import NoMoreTimelinePost from "./NoMoreTimeLinePost";

// import ProfileMain from "./ProfileMain";
import Loader from "../../components/App/Loader";
import { getTimelinePost } from "../../actions/profile";

//ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  profilepicdiv: {
    textAlign: "right",
    paddingRight: "30px",
  },
  profilepic: {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
  },

  //mobile
  profilepicmobilediv: {
    textAlign: "center",
  },
  profilepicmobile: {
    borderRadius: "50%",
    height: "120px",
    width: "120px",
  },
  namemobilediv: {
    textAlign: "center",
    marginTop: "5px",
  },
  aboutmobiletypo: {
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "gray",
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
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
  progress: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "30px",
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

const Profile = ({
  getProfile,
  profile: { profile_loading, profile },
  match,
  auth,
  getTimelinePost,
  timeLinePost: { posts, posts_loading, limit, offset, error, hasMore },
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!posts_loading) return;
    getProfile(match.params.username);
    getTimelinePost(match.params.username, limit, offset);
  }, [getProfile, getTimelinePost]);

  window.onscroll = async (e) => {
    if (error || posts_loading || !hasMore) return;
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      // setLoading(true)
      const res = await getTimelinePost(match.params.username, limit, offset);

      // if (res.status == 200) {
      //   setLoading(false);
      // }
    }
  };

  console.log("limit --------->", limit);
  console.log("offset --------->", offset);

  const classes = useStyles();

  return profile_loading || profile == null ? (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div>
      <Grid container>
        <Hidden smDown>
          <Grid item xs={12} sm={12} md={4}></Grid>
        </Hidden>

        <Grid item xs={12} sm={12} md={4}>
          <Grid container style={{ marginTop: "100px" }}>
            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.profilepicmobilediv}>
                <img
                  style={{ border: "5px solid silver" }}
                  className={classes.profilepicmobile}
                  src="https://i.pinimg.com/236x/3f/d0/d5/3fd0d516192d8a342ea8fd1cb9a63a01--street-style-fashion-fashion-looks.jpg"
                ></img>{" "}
              </div>

              <div className={classes.namemobilediv}>
                <Typography variant="h6" gutterBottom>
                  {profile.fullname}
                </Typography>
              </div>

              <div>
                <Typography
                  className={classes.aboutmobiletypo}
                  variant="body1"
                  align="center"
                  gutterBottom
                >
                  {profile.about}
                </Typography>
              </div>

              <div style={{ textAlign: "center", paddingBottom: "5px" }}>
                <Button size="small" onClick={handleClickOpen}>
                  Know More
                </Button>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    Modal title
                  </DialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      Cras mattis consectetur purus sit amet fermentum. Cras
                      justo odio, dapibus ac facilisis in, egestas eget quam.
                      Morbi leo risus, porta ac consectetur ac, vestibulum at
                      eros.
                    </Typography>
                    <Typography gutterBottom>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur et. Vivamus sagittis lacus vel augue laoreet
                      rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                      Aenean lacinia bibendum nulla sed consectetur. Praesent
                      commodo cursus magna, vel scelerisque nisl consectetur et.
                      Donec sed odio dui. Donec ullamcorper nulla non metus
                      auctor fringilla.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                      Save changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <Divider />

              <div>
                <Grid container alignItems="center">
                  <Grid item md={4} xs={4}>
                    
                      <div>
                        <Typography
                          align="center"
                          variant="subtitle1"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          24
                        </Typography>
                        <Typography align="center" style={{ color: "gray" }}>
                          posts
                        </Typography>
                      </div>
                  </Grid>

                  <Grid item md={4} xs={4}>
                    <Link
                      to={`/followers/${profile.username}`}
                      style={{ textDecoration: "None" }}
                    >
                      <Typography 
                      align="center" 
                      variant="subtitle1"
                      style={{ fontWeight: "bold", color: "black" }}
                      >
                        200
                      </Typography>
                      <Typography align="center" style={{ color: "gray" }}>
                        followers
                      </Typography>
                    </Link>
                  </Grid>

                  <Grid item md={4} xs={4}>
                    <Link
                      to={`/followings/${profile.username}`}
                      style={{ textDecoration: "None" }}
                    >
                      <Typography
                        align="center"
                        variant="subtitle1"
                        style={{ fontWeight: "bold", color: "black" }}
                      >
                        24
                      </Typography>
                      <Typography align="center" style={{ color: "gray" }}>
                        followings
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </div>
              <Divider style={{ marginBottom: "10px" }} />

              {posts.map((post) => (
                <TimelinePostCard post={post} auth={auth} />
              ))}
              {error && <div>{error} </div>}
              {!hasMore ? (
                <NoMoreTimelinePost />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "30px",
                    marginBottom: "30px",
                  }}
                  className={classes.progress}
                >
                  <CircularProgress />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Hidden smDown>
          <Grid item xs={12} sm={12} md={4}></Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getTimelinePost: PropTypes.func.isRequired,
  timeLinePost: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
    timeLinePost: state.timeLinePost,
  };
};

export default connect(mapStateToProps, {
  getProfile,
  getTimelinePost,
})(Profile);
