import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { __getPosts } from './postsSlice';

const initialState = {
   posts: [],
   isLoading: false,
   error: null,
};

export const __getPost = createAsyncThunk(
   'GET_POST',
   async (payload, thunkAPI) => {
      try {
         const data = await axios.get(`http://54.82.19.91/posts/${payload}`, {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         console.log("데이터",data.data.data);
         return thunkAPI.fulfillWithValue(data.data.data);
      } catch (error) {
        console.log("겟포스트에러",error)
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const __modifyPost = createAsyncThunk(
   'MODIFY_POST',
   async (payload, thunkAPI) => {
      try {
         axios.put(
            `http://54.82.19.91/posts/${payload.postId}`,
            {
               content: payload.content,
            },
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         );
         return thunkAPI.fulfillWithValue(payload);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const __deletePost = createAsyncThunk(
   'DELETE_POST',
   async (payload, thunkAPI) => {
      try {
         await axios.delete(`http://54.82.19.91/posts/${payload}`, {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         //  const dispatch = useDispatch();
          thunkAPI.dispatch(__getPosts())
         return thunkAPI.fulfillWithValue(payload);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers: {
      [__getPost.pending]: (state) => {
         state.isLoading = true;
      },
      [__getPost.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.post = action.payload;
         console.log("test")
      },
      [__getPost.rejected]: (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      },
      [__modifyPost.pending]: (state) => {
         state.isLoading = true;
      },
      [__modifyPost.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.post = action.payload;
      },
      [__modifyPost.rejected]: (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      },
      [__deletePost.pending]: (state) => {
         state.isLoading = true;
      },
      [__deletePost.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.post = action.payload;
         console.log('delete' + action.payload);
      },
      [__deletePost.pending]: (state, action) => {
         state.isLoading = true;
         state.error = action.payload;
      },
   },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
