import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { __getComments, __modifyComment } from '../../redux/modules/commentSlice';

const GetComments = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(__getComments(id?.postId));
   }, [dispatch]);

   const id = useParams();
   const { isLoading, error, comments } = useSelector((state) => state.comment);
   //    const num = comments.length;
   //    console.log(num);
   const [isEdit, setEdit] = useState(false);
   const [input, setInput] = useState();

   if (isLoading) {
      return <div>로딩 중....</div>;
   }

   if (error) {
      return <div>{error.message}</div>;
   }

   const onModifyCommentHandler = () => {
    setEdit(!isEdit);
    if (input.trim()==='') {
        return alert ('내용을 입력해주세요');
    }
    dispatch(__modifyComment({...comments, comment: input}));
   }

   return (
      <CommentBlock>
         {comments.map((comment) => (
            <Comments key={comment?.commentId}>
               <LoginId>{comment?.loginId}</LoginId>
               <Comment>
                {!isEdit? (<>{comment?.comment}</>
                ) : (
                    <input
                    value={input}
                    placeholder={`{comment?.comment}`}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}></input>
                ) }
                </Comment>
               <Btns>
                  {!isEdit ? (
                     <button onClick={() => setEdit(true)}>수정</button>
                  ) : (
                     <button onClick={onModifyCommentHandler}>
                        저장</button>
                  )}
                  <button
                //   onClick={onDeleteCommentHandler}
                  >삭제</button>
               </Btns>
            </Comments>
         ))}
      </CommentBlock>
   );
};

export default GetComments;

const CommentBlock = styled.div`
   margin-top: 20px;
`;

const LoginId = styled.div`
   float: left;
   min-width: 100px;
   height: 25px;
   display: flex;
   text-align: center;
   justify-content: center;
   align-items: center;
   border-bottom: 1px solid #f32b2b;
   margin-right: 20px;
`;

const Comment = styled.div`
   display: flex;
   text-align: center;
   align-items: center;
   height: 25px;
   min-width: 380px;
`;

const Comments = styled.div`
   margin-bottom: 5px;
   display: flex;
`;

const Btns = styled.div``;
