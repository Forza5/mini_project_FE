import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../../pages/Home';
import { __getPosts } from '../../redux/modules/postsSlice';

const getList = () => {
   const dispatch = useDispatch();
   const { posts } = useSelector((state) => state.posts);

   useEffect(() => {
      dispatch(__getPosts());
   }, [dispatch]);

   return (
      <div>
         {posts.map((post) => (
            <Home key={post.postId} data={post} />
         ))}
      </div>
   );
};
