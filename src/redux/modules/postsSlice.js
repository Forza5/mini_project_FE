import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   posts: [],
   isLoading: false,
   error: null,
};

export const __getPosts = createAsyncThunk(
    'GET_POSTS', async (_, thunkAPI) => {
   try {
      const data = await axios.get('http://54.82.19.91/posts');
      return thunkAPI.fulfillWithValue(data.data);
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const __addPost = createAsyncThunk(
   'ADD_POST',
   async (payload, thunkAPI) => {
      try {
         const { data } = await axios.post(
            'http://54.82.19.91/posts',
            payload,
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         );
         console.log(data);
         return thunkAPI.fulfillWithValue(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: [],
   extraReducers: {
      [__getPosts.pending]: (state) => {
         state.isLoading = true;
      },
      [__getPosts.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.posts = action.payload;
      },
      [__getPosts.rejected]: (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      },
      [__addPost.pending]: (state) => {
         state.isLoading = true;
      },
      [__addPost.fulfilled]: (state, action) => {
         console.log(action.payload);
         state.isLoading = false;
         state.posts = action.payload;
      },
      [__addPost.rejected]: (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
