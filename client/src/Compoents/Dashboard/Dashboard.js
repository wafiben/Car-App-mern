import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { getAllUsers, getAllPosts } from "../../Redux/action/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import UserCard from "./UserCard";
const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.AdminReducer.users);
  const posts = useSelector((state) => state.AdminReducer.posts);
  const isLoading = useSelector((state) => state.AdminReducer.isLaoding);

  const [show, setShow] = useState(true);
  const handleUsers = () => {
    !show ? setShow(true) : setShow(false);

    dispatch(getAllUsers());
  };
  const handlePosts = () => {
    setShow(false);
    dispatch(getAllPosts());
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const spinner = (
    <Stack sx={{ color: "grey.900" }} spacing={5} direction="row">
      <CircularProgress size="7em" />
    </Stack>
  );
  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <Paper
        style={{
          width: "300px",

          height: "500px",
          paddingTop: "20px",
          marginTop: "100px",
        }}
        elevation={7}
      >
        <MenuList style={{ paddingTop: "20px" }}>
          <MenuItem style={{ marginTop: "20px" }}>
            <Button
              onClick={handleUsers}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Users
            </Button>
          </MenuItem>
          <MenuItem style={{ marginTop: "20px" }}>
            <Button
              onClick={handlePosts}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Posts
            </Button>
          </MenuItem>
        </MenuList>
      </Paper>
      {isLoading ? (
        spinner
      ) : (
        <Paper
          style={{
            width: "50%",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "100px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {show && users.map((user) => <UserCard key={user._id} user={user} />)}
          {!show && posts.map((post) => <Post key={post._id} post={post} />)}
        </Paper>
      )}
    </div>
  );
};
export default Dashboard;
