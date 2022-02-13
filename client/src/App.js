import "bootstrap/dist/css/bootstrap.css";
import Home from "./Compoents/Home/Home";
import UseProfile from "./Compoents/UseProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { getUser } from "./Redux/action/AuthActions";
import Navbar from "./Compoents/Navbar/Navbar";
import { Container } from "@material-ui/core";
import Auth from "./Compoents/Auth/Auth";
import PostDetails from "./Compoents/PostDetails/PostDetails";
import PostForm from "./Compoents/PostForm/PostForm";
import Dashboard from "./Compoents/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getUser());
  }, [token]);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/post-car" element={<PostForm />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UseProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
