import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import EditrProfileForm from "./EditProfileForm";
import { getEditProfile } from "../../actions/editProfile";
import { postEditProfile } from "../../actions/editProfile";
import { uploadProfilePicture} from "../../actions/editProfile"
//ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import EditIcon from '@material-ui/icons/Edit';

//ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Image from "material-ui-image";

import CardMedia from "@material-ui/core/CardMedia";


import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  profilePic: {
    borderRadius: "50%",
    height: 250,
    width: 250,
    justifyContent: "center"
  },
  imageWraper: {
    textAlign: "center"
  }
}));

const EditProfileForm = ({
  uploadProfilePicture,
  postEditProfile,
  editProfile: { editProfile, get_edit_profile_loading },
  getEditProfile
}) => {
  const initialState = {
    mobile: "",
    dob: "",
    place: "",
    about: "",
    avatar: null
  };


  const [formData, setFormData] = useState(initialState);


  useEffect(() => {
    getEditProfile();
    setFormData({
      mobile: editProfile.mobile,
      place: editProfile.place,
      about: editProfile.about,
      avater: editProfile.avatar
    });
  }, [get_edit_profile_loading]);

  const classes = useStyles();

  const { mobile, dob, place, about, avatar } = formData;

  console.log(editProfile.avatar, "----------------------------------->");

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleProfilePicChange = e => {
    const image = e.target.files[0];

    const imageFormData  = new FormData()
    imageFormData.append('avatar', image, image.name)
    uploadProfilePicture(imageFormData)

    // call the server
  }

  const handleEditPicture = e => {

    const fileInput = document.getElementById("imageInput")
    fileInput.click()

  }


  const onSubmit = async e => {
    e.preventDefault();
    postEditProfile(mobile, dob, place, about, avatar);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <br></br>
      <div>
        <br></br>
      </div>
      <Typography component="h1" variant="h5">
        Edit Profile
      </Typography>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <Paper>
          <div className={classes.imageWraper}>
            <img className={classes.profilePic} src={editProfile.avatar} alt />
            <input  hidden = "hidden" type="file" id = "imageInput" onChange={handleProfilePicChange}/>
            <IconButton onClick={handleEditPicture} className="button">

              <EditIcon/>

            </IconButton>
          </div>
        </Paper>

        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          fullWidth
          label="Mobile"
          type="text"
          id="mobile"
          autoComplete="current-password"
          type="number"
          placeholder="mobile"
          name="mobile"
          value={mobile}
          onChange={e => onChange(e)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          size="small"
          label="Place"
          type="text"
          id="place"
          autoComplete="current-password"
          type="text"
          placeholder="place"
          name="place"
          value={place}
          onChange={e => onChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          size="small"
          label="About"
          id="about"
          autoComplete="about"
          type="text"
          placeholder="about"
          name="about"
          value={about}
          onChange={e => onChange(e)}
          multiline
          rows={4}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          value="EditProfileForm"
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    editProfile: state.editProfile

  };
};

EditProfileForm.propTypes = {
  getEditProfile: PropTypes.func.isRequired,
  postEditProfile: PropTypes.func.isRequired,
  uploadProfilePicture: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getEditProfile, postEditProfile, uploadProfilePicture })(
  EditProfileForm
);
