import React from "react";
import { Typography, Avatar } from "@material-ui/core/";
import useStyles from "./styles";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { deleteUser } from "../../Redux/action/AdminActions";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (window.confirm("are you sure you want delete this user")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <CardContent
        elevation={8}
        style={{ boxShadow: "10px 5px 5px gray", borderRadius: "5px" }}
      >
        <Avatar className={classes.purple} alt="user-name" src={user.imageUrl}>
          {user.name.charAt(0)}
        </Avatar>
        <Typography className={classes.userName} variant="h6">
          {" "}
          {user.name}
        </Typography>
        <Typography className={classes.userName} variant="h6">
          {" "}
          {user.phone}
        </Typography>
        <Typography className={classes.userName} variant="h6">
          {" "}
          {user.email}
        </Typography>
        <Button
          onClick={handleDelete}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardContent>
    </div>
  );
};

export default UserCard;
