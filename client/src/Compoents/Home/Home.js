import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../Redux/action/PostActions";
import Posts from "../Posts/Posts";
import {
  Container,
  Grow,
  Grid,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { getUser } from "../../Redux/action/AuthActions";
const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.PostReducer.isLoading);
  
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress size="10em" />
      </Paper>
    );
  }

  return (
    <Grow in>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={12}>
          <Posts />
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Home;
