import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deletePost,
  likePost,
  getOnePost,
} from "../../../Redux/action/PostActions";
const Post = ({ post }) => {
  toast.configure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const posts = useSelector((state) => state.PostReducer.post);
  const handleClick = () => {
    if (window.confirm("are you sure")) {
      dispatch(deletePost(post._id));
    }
  };
  const openPost = () => {
    dispatch(getOnePost(post._id));
    navigate(`/posts/${post._id}`);
  };
  const classes = useStyles();
  const like = () => {
    dispatch(likePost(post._id));
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
         className={classes.cardAction} 
        onClick={openPost}
      >
        <CardMedia
          component="img"
          className={classes.media}
          title={post.model}
          image={post.SelectedFile}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post && post.price} dt</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {/*  <Button style={{ color: "white" }} size="small" onClick={handleClick}>
            <MoreHorizIcon fontSize="medium" />
          </Button> */}
        </div>
        <div className={classes.details}>
          <Typography variant="h6" color="textSecondary">
            {post.model}
          </Typography>
        </div>
        <CardContent >
          <Typography
            className={classes.title}
            variant="body2"
            color="textSecondary"
          >
            {post.descreption}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user} onClick={like}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like
          {post.likes.length > 0 && `  ${post.likes.length}`}
        </Button>

        <Button
          size="small"
          color="secondary"
          disabled={!user || !(user._id == post.user)}
          onClick={handleClick}
        >
          <DeleteIcon fontSize="small" />
          &nbsp;Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
