import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import Write from "../pages/Write";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="write" element={<Write />} />
        <Route path="/" element={<Home />} />
        <Route path="posts/:postId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
