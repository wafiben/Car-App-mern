import React from "react";
import useStyles from "./Styles";
import { Typography } from "@material-ui/core/";
import moment from "moment";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePostFromAdmin } from "../../../Redux/action/AdminActions";
import { useDispatch } from "react-redux";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (window.confirm("are you sure you want to delete this post")) {
      dispatch(deletePostFromAdmin(post._id));
    }
  };
  const classes = useStyles();
  return (
    <div
      className={classes.card}
      style={{
        borderRadius: "15px",
        boxShadow: "10px 5px 5px gray",
        flexDirection: "column",
      }}
      elevation={10}
    >
      <div
        className={classes.section}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h6" component="h2">
            model: {post && post.model}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            price :{post && post.price} dt
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            descreption: {post && post.descreption}
          </Typography>

          <Typography variant="body1">
            created {post && moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div>
          <img src={post.SelectedFile} style={{ width: "200px" }} />
        </div>
      </div>
      <div style={{ margin: "auto" }}>
        <Button
          onClick={handleDelete}
          style={{ width: "100%", textAlign: "center", marginBottom: "10px" }}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Post;
