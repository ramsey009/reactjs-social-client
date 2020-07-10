import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { setAlert } from "../../actions/alert";
import { signUp } from "../../actions/auth";
import Loader from "../../components/App/Loader";
import LoadingOverlay from "react-loading-overlay";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function SignUp({ setAlert, signUp, auth }) {
  const classes = useStyles();

  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  // to set accept terms and condition
  const [checked, setChecked] = useState(true);
  const [redirect, setRedirect] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const handleChange = (event) => {
    if (checked == true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  // handle form data
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const { fullname, username, email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    console.log("submit button clicked");
    e.preventDefault();
    let fullname_length = fullname.trim().length;
    let username_length = username.trim().length;
    let email_length = email.trim().length;
    let password_length = password.trim().length;

    if (fullname_length == 0) {
      console.log("here you got the request");
      setAlert("Please enter the full name", "error");
    } else if (fullname_length < 3 || fullname_length > 20) {
      setAlert(
        "Please enter the full name having length between 3 to 25",
        "error"
      );
    } else if (username_length == 0) {
      setAlert("Please enter the username", "error");
    } else if (username_length < 3 || username_length > 15) {
      setAlert(
        "Please enter the  username having length between 3 to 15",
        "error"
      );
    } else if (email_length == 0) {
      setAlert("Please enter the email", "error");
    } else if (validateEmail(email) == false) {
      setAlert("Please enter a valid email", "error");
    } else if (email_length < 3 || email_length > 30) {
      setAlert(
        "Please enter email having length not greater than 30 character",
        "error"
      );
    } else if (checked == false) {
      setAlert("Please accept terms and condition", "error");
    } else {
      setLoader(true);

      const res = await signUp({ fullname, username, email, password });

      if (res.data.custom_status == "201") {
        setLoader(false);
        setRedirect(true);
      }
    }
  };

  if (redirect) {
    return <Redirect to="/auth-info" />;
  }

  return (
    <LoadingOverlay active={loader} spinner text="Loading your content...">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            src="https://i.ibb.co/DCfMGHd/vismrita-logo.png"
            className={classes.large}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => onSubmit(e)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fullname"
                  name="fullname"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  autoFocus
                  value={fullname}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label="Please read and accept Terms and Conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </LoadingOverlay>
  );
}

SignUp.proTypes = {
  setAlert: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { setAlert, signUp })(SignUp);
