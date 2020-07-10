import {
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADED_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGN_UP_EMAIL_CONFIRMATION_SUCCESS,
  SIGN_UP_EMAIL_CONFIRMATION_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken  from '../utils/setAuthToken'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//LOAD USER
export const loadUser = () => async dispatch => {

  console.log("inside user loaded function")

  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  const res = await axios.get('/core/load-user')


  console.log("*********************", res )

  if (res.data.custom_status == "201"){


    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&")



    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  }else{
    dispatch({
      type: USER_LOADED_ERROR,
      payload: res.data
    })
  }

}

//SIGNUP USER
export const signUp = ({ fullname, username, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ fullname, username, email, password });

  const res = await axios.post("/core/signup/", body, config);
  if (res.data.custom_status == "201") {
    console.log("inside if conditioon");

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    // dispatch(setAlert(res.data.message, res.data.severity, 50000));
    return res;
  } else {
    dispatch({
      type: SIGNUP_FAIL,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, res.data.severity));
  }
};

//EMAIL CONFIRMATION ON SIGNUP
export const signUpEmailConfirmation = (token) => async (dispatch) => {
  const res = await axios.get(`/core/sign-up-email-confirmation/${token}`);

  if (res.data.custom_status == "200") {
    dispatch({
      type: SIGN_UP_EMAIL_CONFIRMATION_SUCCESS,
      payload: res.data,
    });
  } else {
    dispatch({
      type: SIGN_UP_EMAIL_CONFIRMATION_FAIL,
      payload: res.data,
    });
  }
};

//FORGOT PASSWORD
export const forgotPassword = ({ email }) => async (dispatch) => {
  console.log("-------------------->", email);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  console.log(body);

  const res = await axios.post("/core/forgot-password/", body, config);
  if (res.data.custom_status == "201") {
    console.log("hello");

    console.log("inside if conditioon", res);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: res.data,
    });
    // dispatch(setAlert(res.data.message, res.data.severity, 50000));
    return res;
  } else {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, res.data.severity));
  }
};

//FORGOT PASSWORD RESET
export const forgotPasswordReset = ({ password }, token) => async (
  dispatch
) => {
  console.log("-------------------->", password);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ password });

  console.log(body);

  const res = await axios.post(
    `/auth/forgot-password-reset/${token}/`,
    body,
    config
  );
  if (res.data.custom_status == "200") {
    console.log("inside if conditioon");

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, res.data.severity, 50000));
  } else {
    dispatch({
      type: SIGNUP_FAIL,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, res.data.severity));
  }
};

// SIGN IN
export const signIn = ({ email, password }) => async (
  dispatch
) => {
  console.log("-------------------->", email, password);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });


  const res = await axios.post(`/core/signin/`,body,config);

  console.log(res);

  if (res.data.custom_status == "201") {
    console.log("inside if conditioon");

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, res.data.severity, 50000));
  } else {
    dispatch({
      type: SIGNIN_FAIL,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, res.data.severity));
  }
};


