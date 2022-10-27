import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
   __getComments,
   __modifyComment,
} from '../../redux/modules/commentSlice';
import GetComment from './GetComment';

const GetComments = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(__getComments(id?.postId));
   }, [dispatch]);

   const id = useParams();
   const { isLoading, error, comments } = useSelector((state) => state.comment);
   //    const num = comments.length;
   //    console.log(num);

   if (isLoading) {
      return <div>로딩 중....</div>;
   }

   if (error) {
      return <div>{error.message}</div>;
   }
   
   return (
      <>
         {comments.map((comment) => (
            <GetComment key={comment.commentId} comment={comment} />
         ))}
      </>
   );
};

export default GetComments;
