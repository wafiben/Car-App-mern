import useStyles from "./styles";
import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Avatar,
} from "@material-ui/core/";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getOnePost } from "./../../Redux/action/PostActions";
import { useParams } from "react-router";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.PostReducer.post);
  const isLoading = useSelector((state) => state.PostReducer.isLoading);
  const user = useSelector((state) => state.AuthReducer.user);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getOnePost(id));
  }, [dispatch]);
  useEffect(() => {
    if (!user) {
      toast.info(
        "you need to connect to see informations about the owner of this car",
        { position: toast.POSITION.TOP_CENTER }
      );
    }
  }, []);
  const notify = () => {};
  notify();
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const cardUser = (
    <div style={{ marginTop: "50px" }}>
      <CardContent elevation={6}>
        <Avatar
          className={classes.purple}
          alt="user-name"
          src={post && post.user.imageUrl}
        >
          {post && post.user.name.charAt(0)}
        </Avatar>
        <Typography className={classes.userName} variant="h6">
          {" "}
          {post && post.user.name}
        </Typography>
        <Typography className={classes.userName} variant="h6">
          {" "}
          {post && post.user.phone}
        </Typography>
        <Typography className={classes.userName} variant="h6">
          {" "}
          {post && post.user.email}
        </Typography>
      </CardContent>
    </div>
  );
  return (
    <Container>
      <ToastContainer style={{ marginTop: "80px" }} />
      <Paper
        style={{ padding: "20px", margin: "90px", borderRadius: "15px" }}
        elevation={10}
      >
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {post && post.model}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post && post.price} dt
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post && post.descreption}
            </Typography>

            <Typography variant="body1">
              {post && moment(post.createdAt).fromNow()}
            </Typography>

            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Owner</strong>
              <Paper style={{ margin: "auto" }}>
                {user
                  ? cardUser
                  : "you need to connect to see details about the owner"}
              </Paper>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />

            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                post
                  ? `/${post.SelectedFile}`
                  : "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post && post.model}
            />
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default PostDetails;
