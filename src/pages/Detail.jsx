import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __getPost } from '../redux/modules/postSlice';
import Layout from '../components/Layout';
import styled from 'styled-components';

const Detail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getPost(id?.postId));
 }, [dispatch]);

   const id = useParams();
   const navigate = useNavigate();
   const [isEdit, setEdit] = useState(false);
   const [input, setInput] = useState();
   const { isLoading, error, post } = useSelector((state) => state.post);

   //  if (isLoading) {
   //     return <div>로딩 중....</div>;
   //  }

   if (error) {
      return <div>{error?.message}</div>;
   }

   return (
      <Layout>
         <PostView>
            <Btns>
               <button>수정</button>
               <button>삭제</button>
            </Btns>
            <div>{post?.typeofpet} category subcatogory</div>
            <div>
               제조사: {post?.maker} 제품명: {post?.product}
            </div>
            <div>{post?.loginId}</div>
            <div>
               <h3>{post?.title}</h3>
            </div>
            <div>{post?.content}</div>
            <ImgView>img</ImgView>
            <div>좋아요</div>
         </PostView>
         <ReplyView>댓글 부분</ReplyView>
      </Layout>
   );
};

export default Detail;

const PostView = styled.div`
   background-color: #e3e0e1;
   width: 600px;
   margin-bottom: 5px;
   border-radius: 10px;
   padding: 20px;
`;

const ReplyView = styled.div`
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
