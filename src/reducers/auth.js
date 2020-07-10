import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGN_UP_EMAIL_CONFIRMATION_SUCCESS,
    SIGN_UP_EMAIL_CONFIRMATION_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    SIGNIN_FAIL,
    SIGNIN_SUCCESS,
    USER_LOADED,
    USER_LOADED_ERROR
    
  } from "../actions/types";
  
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    auth_loading: true,
    couser: null,
    auth_info: {},
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {

      case SIGN_UP_EMAIL_CONFIRMATION_SUCCESS:
        return {
          ...state,
          auth_info: payload
        };
      case SIGN_UP_EMAIL_CONFIRMATION_FAIL:
        return {
          ...state,
          auth_info: payload
        };

      case FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          auth_info: payload
        }
      case FORGOT_PASSWORD_FAIL:
        return {
          ...state,
          auth_info:payload
        }

      case SIGNUP_SUCCESS:
        return {
          ...state,
          token: null,
          auth_info:payload,
          auth_loading: false
        };
      case SIGNUP_FAIL:
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          auth_loading: false
        };
      
      case SIGNIN_SUCCESS:
        console.log("payload inside sign in page",payload)
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          auth_loading: false
        };
      case SIGNIN_FAIL:
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          auth_loading: false,
          isAuthenticated: false,
        };

      case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            auth_loading: false,
            couser: payload.couser
        };
      case USER_LOADED_ERROR:
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          auth_loading: false,
          isAuthenticated: false,
        };

      default:
        return state;
    }
  }
  