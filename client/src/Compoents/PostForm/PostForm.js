import useStyles from "./styles";
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { postPost } from "../../Redux/action/PostActions";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [SelectedFile, setSelectedFile] = useState(null);
  const [post, setPost] = useState({
    model: "",
    descreption: "",
    price: "",
  });
  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    if (post.model && post.descreption && post.price && SelectedFile) {
      formData.append("model", post.model);
      formData.append("descreption", post.descreption);
      formData.append("price", post.price);
      formData.append("SelectedFile", SelectedFile);
      if (dispatch(postPost(formData))) {
        toast("wait for adding your car to our list");
      }
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      alert("fields are required");
    }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <ToastContainer style={{ marginTop: "80px" }} />
      <form
        autoComplete="off"
        noValidate
        onSubmit={onSubmit}
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6" style={{ marginBottom: "50px" }}>
          {" "}
          POST YOUR CAR
        </Typography>
        <TextField
          name="model"
          variant="outlined"
          label="model"
          value={postMessage.model}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="descreption"
          variant="outlined"
          label="descreption"
          fullWidth
          value={postMessage.descreption}
          onChange={handleChange}
          required
        />
        <TextField
          name="price"
          variant="outlined"
          label="price"
          fullWidth
          value={postMessage.price}
          onChange={handleChange}
          required
        />

        <div>
          <TextField
            accept="image/*"
            type="file"
            onChange={(event) => setSelectedFile(event.target.files[0])}
            required
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          color="primary"
          fullWidth
          required
        >
          {" "}
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;
