import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { logOut } from "../../Redux/action/AuthActions";
import SendIcon from "@mui/icons-material/Send";
import { toggle } from "../../Redux/action/AuthActions";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = () => {
    dispatch(logOut(navigate));
  };

  const user = useSelector((state) => state.AuthReducer.user);

  const postCar = () => {
    if (localStorage.getItem("token")) {
      navigate("/post-car");
    } else {
      if (window.confirm("you need to sign in before")) {
        dispatch(toggle());
        navigate("/auth");
      }
    }
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">
          <Link to="/">
            <img className={classes.image} src="logo.jpg" alt="icon" height="60" />
          </Link>
        </Typography>
        <Typography className={classes.heading} variant="h2" align="center">
          <Button variant="contained" endIcon={<SendIcon />} onClick={postCar}>
            SELL YOUR CAR
          </Button>
          {user && user.role === 1 && (
            <Button
              variant="contained"
              style={{ margin: "15px" }}
              component={Link}
              to="/admin"
            >
              Dashboard
            </Button>
          )}{" "}
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {token ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt="user-name"
              src={user && user.imageUrl}
            >
              {user && user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {" "}
              {user && user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleClick}
            >
              {" "}
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/auth"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
