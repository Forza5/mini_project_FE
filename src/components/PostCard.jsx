import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getCommentsNum } from "../redux/modules/commentSlice";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      </FirstLine>
      <PhotoArea>
        {" "}
        <ImgView src={post.photo} onClick={onViewHandler} alt="이미지" />{" "}
      </PhotoArea>
      <LikeBox>
        <p>좋아요 {post.likes}</p>
      </LikeBox>
      <TitleBox>
        <IDs>{post.loginId}</IDs>
        <div> {post.title} </div>
        {/* title이 아닌 content가 들어왔으면 좋겠습니다!! */}
      </TitleBox>
      <div> 댓글</div>
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
  width: 70%;
  margin: 0 auto;
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
  font-size: 20px;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.3s;
  ::after {
    content: "댓글 남기러 가기!!";
    display: inline-block;
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: ease-in-out 0.4s;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
  }
  &:hover {
    z-index: 1;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const TypeOfPet = styled.p`
  color: grey;
`;

const ProductInfo = styled.p`
  color: grey;
  margin-left: 5px;
`;

const ImgView = styled.img`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;
