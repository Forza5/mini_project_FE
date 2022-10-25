import React from 'react';
import styled from 'styled-components';

const PostCard = ({ post }) => {

   return (
      <Card>
         <Btns>
            <button>수정</button> 
            <button>삭제</button>
         </Btns>
         <div> {post.typeofpet} </div>
         <div>
            {post.maker} / {post.product}
         </div>
         <div> 작성자: {post.loginId}</div>
         <div> {post.title} </div>
         <PhotoArea> photo </PhotoArea>
         <div> 댓글(n) 좋아요 {post.likes} </div>
      </Card>
   );
};

export default PostCard;

const Card = styled.div`
   width: 400px;
   background-color: #e3e0e1;
   margin-bottom: 10px;
   padding: 10px;
   border-radius: 10px;
`;

const Btns = styled.div`
   float: right;
`;

const PhotoArea = styled.div`
   background-color: aliceblue;
   height: 100px;
   margin: 10px;
`;
