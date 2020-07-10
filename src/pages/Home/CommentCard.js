import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import {  Redirect } from "react-router-dom";


//ui
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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";

//function
import { submitCommentReport } from "../../actions/report";
import { deleteComment} from "../../actions/posts";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
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

const CommentCard = ({
  comment: { id, body, fullname, couser_id },
  auth,
  submitCommentReport,
  deleteComment
}) => {
  const classes = useStyles();

  //HANDLE REDIRECTION
  const [redirect, setRedirect] = React.useState(false);


  //HANDLE COMMENT MENU=================================================
  const [commentMenu, setCommentMenu] = React.useState(null);
  const handleClick = (event) => {
    setCommentMenu(event.currentTarget);
  };

  const closeCommentMenu = (e) => {
    setCommentMenu(null);
  };

  //HANDLE DELETION OF COMMENT=============================================
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const closeCommentMenuAndOpendeleteDialog = (e) => {
    e.preventDefault()
    setDeleteDialog(true);
    setCommentMenu(null);
  };

  const handleCloseDeleteDialogAndSubmitDelete = async (e) =>{
    e.preventDefault()
    setDeleteDialog(false);
    const res = await deleteComment(id)

    // if (res.status == 200) {
    //   setRedirect(true);
    // }
  }

  const handleCloseDeleteDialog = (e) => {
    setDeleteDialog(false);
  };

  //HANDLE REPORT ON COMMENT==============================================
  const [reportType, setReportType] = React.useState("0");

  const handleReportTypeSelect = (event) => {
    setReportType(event.target.value);
  };

  const formData = new FormData();
  formData.append("reporter", auth.couser.id);
  formData.append("report_type", reportType);
  formData.append("comment", id);
  formData.append("entity_type", "comment");

  const [openReportDialog, setOpenReportDialog] = React.useState(false);

  const closeCommentMenuAndOpenReportDialog = (e) => {
    e.preventDefault();
    setCommentMenu(null);
    setOpenReportDialog(true);
  };

  const CloseReportDialogAndSubmitReport = (e) => {
    e.preventDefault();
    setOpenReportDialog(false);
    submitCommentReport(formData);
  };

  const CloseReportDialog = () => {
    setOpenReportDialog(false);
  };


  if (redirect) {
    return <Redirect to="http://127.0.0.1:3000/" />;
  }

  return (
    <div className={classes.root}>
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
              onClick={handleClick}
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={commentMenu}
              keepMounted
              open={Boolean(commentMenu)}
              onClose={closeCommentMenu}
            >
              {/* handle report here===================================================== */}
              {auth.couser.id != couser_id && (
                <div>
                  <MenuItem onClick={closeCommentMenuAndOpenReportDialog}>
                    Report
                  </MenuItem>
                  <Dialog
                    onClose={CloseReportDialog}
                    aria-labelledby="customized-dialog-title"
                    open={openReportDialog}
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={CloseReportDialog}
                    >
                      Report on Comment
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
                      <Button
                        autoFocus
                        onClick={CloseReportDialogAndSubmitReport}
                        color="primary"
                      >
                        Report
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}

              {/* handle delete here ===================================================== */}
              {auth.couser.id === couser_id && (
                <div>
                  <MenuItem onClick={closeCommentMenuAndOpendeleteDialog}>Delete</MenuItem>
                  <Dialog
                    open={deleteDialog}
                    onClose={handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Delete Comment"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure, you want to delete this comment, once
                        deleted it can not be retrieved
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCloseDeleteDialogAndSubmitDelete}
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
        title={fullname}
        subheader={body}
      />
    </div>
  );
};

CommentCard.propTypes = {
  // post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  // updateLike: PropTypes.func.isRequired,
  // updateBookmark: PropTypes.func.isRequired,
  submitCommentReport: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  // commentBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  // updateLike,
  // updateBookmark,
  submitCommentReport,
  deleteComment,
})(CommentCard);








































// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";

// import { withStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import MuiDialogTitle from "@material-ui/core/DialogTitle";
// import MuiDialogContent from "@material-ui/core/DialogContent";
// import MuiDialogActions from "@material-ui/core/DialogActions";
// import CloseIcon from "@material-ui/icons/Close";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

// import Button from "@material-ui/core/Button";


// import { submitCommentReport } from "../../actions/report";
// import {deleteComment, deletePost} from '../../actions/posts'

// import PropTypes from "prop-types";
// import { connect } from "react-redux";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: "100%",
//   },
//   media: {
//     height: 0,
//   },
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: "rotate(180deg)",
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           className={classes.closeButton}
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

// const CommentCard = ({ 
//   comment: { id, body, fullname, couser_id },
//   auth,
//   submitCommentReport,
//   deleteComment
//  }) => {
//   const classes = useStyles();

//   //comment menu
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = (e) => {
//     e.preventDefault()
//     setAnchorEl(null);
//     deleteComment(id)
//   };

//   //handle both changes card menu and dialog
//   const handleBothCommentMenuAndDialog = (event) => {
//     handleClose(event);
//     handleClickOpen(event);
//   };

//   //handle report type select radio button
//   const [reportType, setReportType] = React.useState("0");

//   const handleReportTypeSelect = (event) => {
//     setReportType(event.target.value);
//   };

//   console.log("000000000000000000000000000000000000----->>>>", reportType);

//   // report on post submission
//   const formData = new FormData();
//   formData.append("reporter", auth.couser.id);
//   formData.append("report_type", "1");
//   // formData.append("post", id);
//   // formData.append("couser", couser_id);
//   formData.append("comment", id)
//   formData.append("entity_type", "comment");

//   //after menu dialog option
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const commentReportClose = () => {
//     setOpen(false);
//   };
//   const commentReportSubmit = (e) => {
//     e.preventDefault();
//     setOpen(false);
//     console.log("here tou go ===========================>")
//     submitCommentReport(formData)
//   };

//   return (
//     <div className={classes.root}>
//       <CardHeader 
//         avatar={
//           <Avatar aria-label="recipe" className={classes.avatar}>
//             R
//           </Avatar>
//         }
//         action={
//           <div>
//             <IconButton
//               aria-label="settings"
//               onClick={handleClick}
//               aria-controls="simple-menu"
//               aria-haspopup="true"
//             >
//               <MoreVertIcon />
//             </IconButton>

//             <Menu
//               id="simple-menu"
//               anchorEl={anchorEl}
//               keepMounted
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               {auth.couser.id != couser_id && (
//                 <div>
//                   {/* <MenuItem onClick= { (e) => handleCloseCardMenu, handleClickOpen }>Report</MenuItem> */}
//                   <MenuItem onClick={handleBothCommentMenuAndDialog}>
//                     Report
//                   </MenuItem>

//                   {/* ()=>{ f1(); f2() }
//                   Or in cjsx: onClick={ () => f1(); f2() } – Vadorequest Mar 31 '16 at 13:05  */}

//                   <Dialog
//                     onClose={commentReportClose}
//                     aria-labelledby="customized-dialog-title"
//                     open={open}
//                   >
//                     <DialogTitle
//                       id="customized-dialog-title"
//                       onClose={commentReportClose}
//                     >
//                       Report on Post
//                     </DialogTitle>
//                     <DialogContent dividers>
//                       <FormControl component="fieldset">
//                         <FormLabel component="legend">Gender</FormLabel>
//                         <RadioGroup
//                           aria-label="gender"
//                           name="gender1"
//                           value={reportType}
//                           onChange={handleReportTypeSelect}
//                         >
//                           <FormControlLabel
//                             value="1"
//                             control={<Radio />}
//                             label="Sexual content"
//                           />
//                           <FormControlLabel
//                             value="2"
//                             control={<Radio />}
//                             label="Violent or repulsive content"
//                           />
//                           <FormControlLabel
//                             value="3"
//                             control={<Radio />}
//                             label="Hateful or abusive content"
//                           />
//                           <FormControlLabel
//                             value="4"
//                             control={<Radio />}
//                             label="Child abuse"
//                           />
//                           <FormControlLabel
//                             value="5"
//                             control={<Radio />}
//                             label="Spam or misleading"
//                           />
//                           <FormControlLabel
//                             value="6"
//                             control={<Radio />}
//                             label="Other"
//                           />
//                         </RadioGroup>
//                       </FormControl>
//                     </DialogContent>
//                     <DialogActions>
//                       {reportType != "0" ? (
//                         <Button
//                           autoFocus
//                           onClick={commentReportSubmit}
//                           color="primary"
//                         >
//                           Report
//                         </Button>
//                       ) : (
//                         <Button
//                           autoFocus
//                           disabled
//                           onClick={commentReportSubmit}
//                           color="primary"
//                         >
//                           Report
//                         </Button>
//                       )}
//                     </DialogActions>
//                   </Dialog>
//                 </div>
//               )}
//               {auth.couser.id === couser_id && (
//                 <MenuItem onClick={handleClose}>Delete</MenuItem>
//               )}
//             </Menu>
//           </div>
//         }
//         title={fullname}
//         subheader={body}
//       />
//     </div>
//   );
// };

// CommentCard.propTypes = {
//   // post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   // updateLike: PropTypes.func.isRequired,
//   // updateBookmark: PropTypes.func.isRequired,
//   submitCommentReport: PropTypes.func.isRequired,
//   deleteComment: PropTypes.func.isRequired,
//   // commentBox: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//   };
// };

// export default connect(mapStateToProps, {
//   // updateLike,
//   // updateBookmark,
//   submitCommentReport,
//   deleteComment,
// })(CommentCard);
