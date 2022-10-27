import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import PostCard from "../../components/PostCard";
import { __getPosts } from "../../redux/modules/postsSlice";

const GetList = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);

    useEffect(()=>{
        dispatch(__getPosts());
     }, [dispatch]);

     console.log(posts);
     
    return (
        <>
         {posts?.data?.map(post => (
            <PostCard key={post.postId} post={post} />
         ))}
        </>
    );
};

export default GetList;