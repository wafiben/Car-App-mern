import React from "react";
import { getPosts } from "../../Redux/action/PostActions";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./styles";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
const Posts = () => {
  const posts = useSelector((state) => state.PostReducer.posts);
  const classes = useStyles();
  return (
    <>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.Container}
          container
          alignItems="center"
          spacing={6}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={4}>
              <Post post={post}  />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
