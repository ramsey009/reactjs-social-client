import React, {Fragment, useEffect} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppLayout from "./components/App/AppLayout";
import AuthLayout from "./pages/Auth/AuthLayout";
import ScrollToTop from "./components/App/ScrollToTop";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"; // v1.x

import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import lightGreen from "@material-ui/core/colors/lightGreen";

import { palette } from "@material-ui/system";
import { purple, blueGrey } from "@material-ui/core/colors";

//redux
import { Provider } from "react-redux";
import store from "./store";

import AlertItem from "./components/AlertItem"
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { blue, indigo } from '@material-ui/core/colors'




const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

// const muiTheme = createMuiTheme({
//   palette: createPalette({
//     primary: grey,
//     accent: amber,
//     error: red,
//     type: 'dark'
//   })
// });

if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App({auth}) {

  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])
  const authenticated = auth.isAuthenticated
  return (
    <MuiThemeProvider theme={theme}>
        <Router>
        <AlertItem/>
          <ScrollToTop>
            <Switch>
              {authenticated ? (
                <Route exact render={() => <AppLayout />} />
              ) : (
                <Route exact render={() => <AuthLayout />} />
              )}
            </Switch>
          </ScrollToTop>
        </Router>
    </MuiThemeProvider>
  );
}

App.proTypes = {
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { })(App);