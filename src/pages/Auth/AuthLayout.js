import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import AuthHeader from "./AuthHeader";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import AuthInfo from "./AuthInfo";
import SignUpEmailComfirmation from "./SignUpEmailComfirmation";
import ForgotPasswordReset from "./ForgotPasswordReset";

import * as Routes from "../../routes";

const AuthLayout = ({ props }) => {
  return (
    <>
      <AuthHeader />
      <Switch>
        <Route
          exact
          path={Routes.FORGOT_PASSWORD_RESET}
          component={ForgotPasswordReset}
        />

        <Route exact path={Routes.AUTH_INFO} render={() => <AuthInfo />} />
        <Route
          exact
          path={Routes.SIGN_UP_EMAIL_CONFIRMATION}
          component={SignUpEmailComfirmation}
        />
        <Route exact path={Routes.SIGN_UP} render={() => <SignUp />} />
        <Route exact path={Routes.HOME} render={() => <SignIn />} />
        <Route exact path={Routes.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route
          exact
          path={Routes.RESET_PASSWORD}
          render={() => <ResetPassword />}
        />
        {/* <Redirect to={Routes.HOME} /> */}
      </Switch>
    </>
  );
};

AuthLayout.propTypes = {};

export default AuthLayout;
