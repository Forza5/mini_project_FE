import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __deletePost,
  __getPost,
  __modifyPost,
} from "../redux/modules/postSlice";
import Layout from "../components/Layout";
import styled from "styled-components";
import { __getPosts } from "../redux/modules/postsSlice";
import AddComment from "../features/comments/AddComment";
import GetComments from "../features/comments/GetComments";

const Detail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getPost(id?.postId));
  }, [dispatch]);

  const id = useParams();
  const [isEdit, setEdit] = useState(false);
  const ids = localStorage.getItem("loginId");
  const [input, setInput] = useState();
  const { isLoading, error, post } = useSelector((state) => state.post);
  const LikeNum = post?.likes;
  const navigate = useNavigate();

  console.log(post);
  
  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  const onModifyHandler = () => {
    setEdit(!isEdit);
    if (input.trim() === "") {
      return alert("내용을 입력해주세요");
    }
    dispatch(__modifyPost({ ...post, content: input }));
  };

  const onDeleteHandler = () => {
    dispatch(__deletePost());
    navigate("/");
  };

  return (
    <Layout>
      <PostView>



        <Btns>
          {ids === post?.loginId ? (
            <div>
              <button onClick={() => setEdit(true)}>수정</button>
              <button onClick={onDeleteHandler}>삭제</button>
              <button onClick={onModifyHandler}>저장</button>
            </div>
          ) : null}
        </Btns>

        <div>
          {post?.typeofpet} / {post?.category} / {post?.subcategory}{" "}
        </div>
        <div>
          제조사: {post?.maker} 제품명: {post?.product}
        </div>
        <div>{post?.loginId}</div>
        <div>
          <h3>{post?.title}</h3>
        </div>
        {!isEdit ? (
          <div>{post?.content}</div>
        ) : (
          <ModifyInput
            //  ref = {inputRef}
            value={input}
            placeholder={`${post?.content}`}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></ModifyInput>
        )}
        {/* <div>{post?.content}</div> */}
        <ImgView>
          <ImgBlock src={post?.photo} />
        </ImgView>
        <div>
          좋아요
          {LikeNum > 0 ? LikeNum : null}
        </div>
      </PostView>
      <CommentView>
        <AddComment />
        <GetComments />
      </CommentView>
    </Layout>
  );
};

export default Detail;

const PostView = styled.div`
  width: 70%;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
`;

const CommentView = styled.div`
  background-color: #e3e0e1;
  width: 600px;
  border-radius: 10px;
  padding: 20px;
`;

const ImgView = styled.div`
  width: 550px;
  height: 550px;
  background-color: antiquewhite;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Btns = styled.div`
  margin-top: 10px;
  float: right;
`;

const ImgBlock = styled.img`
  width: 550px;
  height: 550px;
`;

const ModifyInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  font-size: 16px;
`;
