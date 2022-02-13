import React, { useState } from "react";
import useStyles from "./styles";
import Icon from "./icon";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { loginWithGoogle } from "../../Redux/action/AuthActions";
import { useNavigate } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { signIn, signUp } from "../../Redux/action/AuthActions";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const confirm=useSelector(state=>state.AuthReducer.confirm)

  const [isSignup, setIsSignup] = useState(false);
  const [showPasssword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPasssword);
  };

  const handleSubmit = (event) => {
   
    if (!isSignup) {
      event.preventDefault();
      dispatch(signUp(formData, navigate));
    } else {
      event.preventDefault();
      dispatch(signIn(formData, navigate,confirm));
    }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const switchMode = () => {
    isSignup ? setIsSignup(false) : setIsSignup(true);
  };

  const googleSucess = (response) => {
    dispatch(loginWithGoogle(response, navigate));
  };
  const googleFailure = () => {
    console.log("google Sign in was unsuccesfull try again");
  };
  const x = (
    <InputAdornment
      position="end"
      style={{ position: "absolute", right: "39%", top: "48%" }}
    >
      <IconButton onClick={handleShowPassword}>
        {showPasssword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {" "}
          {isSignup ? "Sign In" : "Sign Up"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup ? (
              <>
                <Grid item xs={6} md={12}>
                  <TextField
                    onChange={handleChange}
                    label="email"
                    type="email"
                    fullWidth
                    name="email"
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <TextField
                    style={{ position: "relative" }}
                    name="password"
                    label="password"
                    fullWidth
                    onChange={handleChange}
                    type={showPasssword ? "text" : "password"}
                  />
                  <div style={{ color: "green" }}>{x}</div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6} md={12}>
                  <TextField
                    onChange={handleChange}
                    name="name"
                    label="name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <TextField
                    onChange={handleChange}
                    name="email"
                    label="email"
                    fullWidth
                  />
                </Grid>
                <Grid  item xs={6} md={12}>
                  <TextField
                    name="phone"
                    label="phone"
                    onChange={handleChange}
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <TextField
                    onChange={handleChange}
                    name="password"
                    label="password"
                    type={showPasssword ? "text" : "password"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <TextField
                    name="confirmPassword"
                    label="Repeat Password"
                    onChange={handleChange}
                    type="password"
                    fullWidth
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </Button>
          {isSignup ? (
            <GoogleLogin
              clientId="853792754042-vthrpojjjiphlqvnpj3dqqr2dvav9od5.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSucess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          ) : null}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "already have an account ?Sign In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
