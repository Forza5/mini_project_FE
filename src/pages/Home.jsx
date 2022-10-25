import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { __getPosts } from "../redux/modules/postsSlice";

const Home = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.posts);

  //   useEffect(()=>{
  //      dispatch(__getPosts());
  //   }, [dispatch]);

  if (isLoading) {
    return <div> 로딩 중... </div>;
  }

  if (error) {
    return <div> {error.message} </div>;
  }

  return <Layout></Layout>;
};

export default Home;
