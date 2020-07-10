import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { setAlert } from "../../actions/alert";
import { forgotPasswordReset } from "../../actions/auth";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ForgotPasswordReset({ forgotPasswordReset, setAlert, match }) {
  const classes = useStyles();

  const initialState = {
    password: "",
    confirm_password: ""
  };
  const [formData, setFormData] = useState(initialState);
  const { password, confirm_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    let password_length = password.length;
    let confirm_password_length = confirm_password.length

    if (password_length === 0) {
      setAlert("Please enter the password", "error");
    } else if(password != confirm_password){
        setAlert("Your passwords are not matching, please enter same password in both fields", "error");
    } else if (password_length > 40 || password_length <4) {
      setAlert(
        "Please enter password having character length between 4 and 40",
        "error"
      );
    } else {

        console.log("999999999999999999", match.params.token)
      forgotPasswordReset({ password }, match.params.token);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            value={password}
            onChange={(e) => onChange(e)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirm_password"
            label="Confirm Password"
            name="confirm_password"
            autoComplete="confirm_password"
            autoFocus
            value={confirm_password}
            onChange={(e) => onChange(e)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                SignIn
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

ForgotPasswordReset.proTypes = {
  setAlert: PropTypes.func.isRequired,
  forgotPasswordReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { setAlert, forgotPasswordReset })(
    ForgotPasswordReset
);
