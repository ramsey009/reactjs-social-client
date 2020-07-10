import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Loader from "../../components/App/Loader";
import { connect } from "react-redux";
import { getPeople } from "../../actions/people";
import PeopleItem from "./PeopleCard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import InfiniteScroll from "react-infinite-scroll-component";

import NoMorePeople from "./NoMorePeople"

import { makeStyles } from "@material-ui/core/styles";
import PeopleCard from "./PeopleCard";

// ui variable
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const People = ({getPeople,
  people: { people, people_loading, limit, offset, error, hasMore },
  isAuthenticated,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!people_loading) return;
    getPeople(limit, offset);
  }, [getPeople]);

  window.onscroll = async (e) => {
    if (error || people_loading || !hasMore) return;
    if (document.documentElement.scrollHeight -
      document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      // setLoading(true)
      const res = await getPeople(limit, offset);

      // if (res.status == 200) {
      //   setLoading(false);
      // }
    }
  };

  return people_loading ? (
    <Loader />
  ) : (

    <div>
        <Grid container  className={classes.root}>
          <Grid item xs={3}>
          </Grid>
          <Grid item lg= {4} md={6}  sm= {8} xs={12} >
          <div style={{marginTop:"70px", marginBottom:"100px"}}>
          {people.map((person) => (
              <div>
                <PeopleCard key={person.id} person={person} />
              </div>
            ))}
            {error && <div>{error} </div>}
            {!hasMore ? (
            <NoMorePeople/>
            ):(
              <Loader/>
            )}
          </div>
          
          </Grid>
          <Grid item xs={2}>
            
          </Grid>
           <Grid item xs={3}>
          </Grid> 
        </Grid>
      </div>


  );
};

People.propTypes = {
  getPeople: PropTypes.func.isRequired,
  people: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    people: state.people,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { getPeople })(People);
