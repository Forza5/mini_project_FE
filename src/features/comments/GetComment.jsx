import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  __deleteComment,
  __modifyComment,
} from "../../redux/modules/commentSlice";

const GetCommnet = ({ comment }) => {

   const [isEdit, setEdit] = useState(false);
   const [input, setInput] = useState();
   const dispatch = useDispatch();
   const ids = localStorage.getItem('loginId');


  const onModifyCommentHandler = () => {
    setEdit(!isEdit);
    if (input.trim() === "") {
      return alert("내용을 입력해주세요");
    }
    dispatch(__modifyComment({ ...comment, comment: input }));
  };

  const onDeleteCommentHandler = () => {
    dispatch(__deleteComment(comment.commentId));
  };
   return (
      <>
         <CommentBlock>
            <Comments>
               <LoginId>{comment?.loginId}</LoginId>
               <Comment>
                  {!isEdit ? (
                     <>{comment?.comment}</>
                  ) : (
                     <input
                        value={input}
                        placeholder={`${comment?.comment}`}
                        onChange={(e) => {
                           setInput(e.target.value);
                        }}></input>
                  )}
               </Comment>
               <Btns>
                  {ids === comment?.loginId ? (
                     <div>
                        {!isEdit ? (
                           <button onClick={() => setEdit(true)}>수정</button>
                        ) : (
                           <button onClick={onModifyCommentHandler}>
                              완료
                           </button>
                        )}
                        <button onClick={onDeleteCommentHandler}>삭제</button>
                     </div>
                  ) : null}
               </Btns>
            </Comments>
         </CommentBlock>
      </>
   );

};

export default GetCommnet;

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
