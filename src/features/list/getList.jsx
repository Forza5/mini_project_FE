import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/PostCard";
import styled from "styled-components";
import { __getPosts } from "../../redux/modules/postsSlice";

const GetList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  return (
    <GridBox>
      {posts?.data?.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </GridBox>
  );
};

export default GetList;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
`;
