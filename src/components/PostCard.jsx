import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const onViewHandler = () => {
    navigate(`posts/${post.postId}`);
  };

  return (
    <Card>
      <FirstLine>
        <MainInfo>
          <TypeOfPet> {post.typeofpet} &gt; </TypeOfPet>
          <div>
            <ProductInfo>
              {post.maker} &gt; {post.product}
            </ProductInfo>
          </div>
        </MainInfo>
        <ReviewBtn onClick={onViewHandler}>상세보기</ReviewBtn>
      </FirstLine>
      <PhotoArea>
        {" "}
        <ImgView src={post.photo} />{" "}
      </PhotoArea>
      <LikeBox>
        <p>좋아요 {post.likes}</p>
      </LikeBox>
      <TitleBox>
        <IDs>{post.loginId}</IDs>
        <div> {post.title} </div>
        {/* title이 아닌 content가 들어왔으면 좋겠습니다!! */}
      </TitleBox>
      <div> 댓글(n) </div>
    </Card>
  );
};

export default PostCard;

const LikeBox = styled.div`
  margin-top: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const IDs = styled.div`
  font-weight: bold;
  margin-right: 15px;
`;

const Card = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 30px;
  border-radius: 10px;
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-bottom: 20px;
`;

const ReviewBtn = styled.button`
  width: 120px;
  height: 35px;
`;

const TypeOfPet = styled.p`
  color: grey;
`;

const ProductInfo = styled.p`
  color: grey;
  margin-left: 5px;
`;

const ImgView = styled.img`
  height: 400px;
  width: 400px;
`;
