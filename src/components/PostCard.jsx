import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostCard = ({ post }) => {
   const navigate = useNavigate();

   return (
      <Card>
         <FirstLine>
            <MainInfo>
               <TypeOfPet> {post.typeofpet} </TypeOfPet>
               <div>
                  <ProductInfo>{post.maker} / {post.product}</ProductInfo>
               </div>
            </MainInfo>
            <ReviewBtn>상세보기</ReviewBtn>
         </FirstLine>
         <div> 작성자: {post.loginId}</div>
         <div> {post.title} </div>
         <PhotoArea> photo </PhotoArea>
         <div> 댓글(n) 좋아요 {post.likes} </div>
      </Card>
   );
};

export default PostCard;

const Card = styled.div`
   width: 500px;
   height: 500px;
   background-color: #e3e0e1;
   margin-bottom: 10px;
   padding: 15px;
   border-radius: 10px;
`;

const FirstLine = styled.div`
   display: flex;
   justify-content: space-between;
`;

const MainInfo = styled.div`
   display: flex;
`;

const PhotoArea = styled.div`
   background-color: aliceblue;
   height: 400px;
   width: 400px;
   margin: auto;
   margin-top: 10px;
   margin-bottom: 10px;
`;

const ReviewBtn = styled.button`
    float: right;
`

const TypeOfPet = styled.span`
    color: #16531c;
    font-size: 20px;
`

const ProductInfo = styled.span`
    color: grey;
    margin-left: 5px;
    display: flex;
`