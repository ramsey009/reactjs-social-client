import React from "react";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function MyApp({ key, severity, message }) {
  const { enqueueSnackbar } = useSnackbar();

  const variant = severity 
  if(severity == "success"){
    enqueueSnackbar(message, {variant});
  }

  console.log("this is after sucess");

  return (
    <React.Fragment>
      {/* <Button onClick={handleClickVariant("success")}>
        Show success snackbar
      </Button> */}
    </React.Fragment>
  );
}

function AlertItem({ alerts }) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      autoHideDuration={5000}
      maxSnack={3}
    >
      {/* <MyApp alerts = {alerts} /> */}

      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <MyApp key={alert.id} severity={alert.alertType} message = {alert.msg} />
        ))}
    </SnackbarProvider>
  );
}

AlertItem.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertItem);

// import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import Snackbar from "@material-ui/core/Snackbar";

// import Alert from "@material-ui/lab/Alert";

// function AlertItem({ alerts }) {
//   return (
//     alerts !== null &&
//     alerts.length > 0 &&
//     alerts.map((alert) => (
//       <div style={{marginTop:"80px"}}>
//         <Alert key={alert.id} severity={alert.alertType}>
//         {" "}
//         {alert.msg}{" "}
//       </Alert>

//       </div>

//     ))
//   );
// }

// AlertItem.propTypes = {
//   alerts: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
//   alerts: state.alert,
// });

// export default connect(mapStateToProps)(AlertItem);
