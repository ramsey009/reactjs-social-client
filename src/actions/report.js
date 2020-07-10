import axios from "axios";
import { setAlert } from "./alert";
import { SUBMIT_POST_REPORT, SUBMIT_POST_REPORT_ERROR } from "./types";

//submit post report
export const submitPostReport = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios.post(`/core/report/`, formData, config);

  console.log(res);
  if (res.status == 201) {
    dispatch(setAlert("reported successfully", "success", 50000));
  } else {
    dispatch(setAlert(res.data.message, res.data.severity));
  }
};

//submit comment report
export const submitCommentReport = (formData) => async (dispatch) => {

    console.log("---------anarkali-------->", formData)


    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const res = await axios.post(`/core/report/`, formData, config);
  
    console.log("----------------->", res);
    if (res.status == 201) {
      dispatch(setAlert("reported successfully", "success", 50000));
    } else {
      dispatch(setAlert(res.data.message, res.data.severity));
    }
  };
