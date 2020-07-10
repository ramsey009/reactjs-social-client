import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createPost } from "../../actions/posts";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

//local
import { setAlert } from "../../actions/alert";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  profilePic: {
    borderRadius: "50%",
    height: 250,
    width: 250,
    justifyContent: "center",
  },
  imageWraper: {
    textAlign: "center",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formHeading: {
    textAlign: "center",
  },
}));

const CreatePost = ({ createPost, setAlert }) => {
  //============ for image purpose================
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleImageChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  //=========== for text field purpose
  const initialState = {
    title: "",
    body: "",
  };

  const [category, setCategoty] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = (event) => {
    setCategoty(event.target.value);
  };

  console.log("{{{{{{{{{{{{{{{{{{{{", category);

  const classes = useStyles();

  const [formData, setFormData] = useState(initialState);
  const { title, body } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    let category_length = category.trim().length;
    let title_length = title.trim().length;
    let body_length = body.trim().length;
    let image_raw_length = image.raw;
    // let image_raw_name_length = image.raw.name.trim().length;

    if (category_length == 0) {
      setAlert("please choose a category", "error");
    } else if (title_length == 0) {
      setAlert("Please enter the title", "error");
    } else if (title_length < 2 || title_length > 100) {
      setAlert("Please enter the title having 2 to 100 character", "error");
    } else if (body_length == 0) {
      setAlert("Creation can not be blank", "error");
    } else if (body_length < 20 || body_length > 2000) {
      setAlert("Please write the creation having 20 to 20000 character", "");
    } else {
      const formData = new FormData();
      console.log(formData);

      if (image_raw_length != "") {
        formData.append("picture", image.raw, image.raw.name);
      }

      formData.append("title", title);
      formData.append("body", body);
      formData.append("category", category);
      const res = await createPost(formData);

      if (res.status == 201) {
        setRedirect(true);
      }
    }
  };

  // console.log(image.raw, image.raw.name);

  // const handleUpload = async (e) => {
  //   e.preventDefault()
  //   const formData = new FormData()
  //   formData.append('image', image.raw)
  //   const config = { headers: { 'content-type': 'multipart/form-data' } }

  //   await uploadToBackend('endpoint', {image: image.raw}, config)
  // }

  console.log("------------------>", category);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Hidden smDown>
          <Grid item md={4}></Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={4}>
          <div className="form-card">
            <div className={classes.formHeading}>
              <h1 className="large text-primary ">create something</h1>
            </div>

            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div style={{ textAlign: "center" }}>
                <label htmlFor="upload-button">
                  {image.preview ? (
                    <img src={image.preview} width="300" height="300" />
                  ) : (
                    <>
                      <span className="fa-stack fa-2x mt-3 mb-2">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fas fa-store fa-stack-1x fa-inverse" />
                      </span>
                      <h4 className="text-center">Upload Image</h4>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                {/* <br />
              <button onClick={handleUpload}>Upload</button> */}
              </div>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  ref={inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={handleChange}
                  labelWidth={labelWidth}
                >
                  <MenuItem value="1">Kavita</MenuItem>
                  <MenuItem value="2">Kahani</MenuItem>
                  <MenuItem value="3">Blog</MenuItem>
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                label="Title"
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                label="Creation"
                id="about"
                autoComplete="about"
                type="text"
                placeholder="Creation"
                name="body"
                multiline
                onChange={(e) => onChange(e)}
                multiline
                rows={20}
                value={body}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                value="CreatePost"
              >
                Submit Creation
              </Button>
            </form>
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item md={4}></Grid>
        </Hidden>
      </Grid>
    </Fragment>
  );
};

CreatePost.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost, setAlert })(CreatePost);
