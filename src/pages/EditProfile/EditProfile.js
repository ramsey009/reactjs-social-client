import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import EditrProfileForm from "./EditProfileForm";


//ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

const EditrProfile = props => {
  return (
    <div>
      <Grid container spacing={1}>
        <Hidden smDown>
          <Grid item md={3}></Grid>
        </Hidden>

        <Grid item xs={12} sm={12} md={4}>
          <div>
              <EditrProfileForm/>
          </div>
        </Grid>

        <Hidden smDown>
          <Grid item md={4}></Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

EditrProfile.propTypes = {};

export default EditrProfile;
