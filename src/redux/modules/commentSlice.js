import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   comments: [],
   isLoading: false,
   error: null,
};

export const __getComments = createAsyncThunk(
   'GET_COMMENT_BY_ID',
   async (payload, thunkAPI) => {
      try {
         const data = await axios.get(
            `https://tastekim.shop/comments/${payload}`,
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         );
         return thunkAPI.fulfillWithValue(data.data.data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const __modifyComment = createAsyncThunk(
   'MODIFY_COMMENT',
   async (payload, thunkAPI) => {
      try {
         axios.put(
            `https://tastekim.shop/comments/${payload.commentId}`,
            {
               comment: payload.comment,
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

export const __deleteComment = createAsyncThunk(
   'DELETE_POST',
   async (payload, thunkAPI) => {
      console.log(payload);
      try {
         await axios.delete(`https://tastekim.shop/comments/${payload}`, {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         thunkAPI.dispatch(__getComments());
         return thunkAPI.fulfillWithValue(payload);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const __addComment = createAsyncThunk(
   'ADD_COMMENT',
   (payload, thunkAPI) => {
      console.log(payload);
      try {
         axios.post(
            `https://tastekim.shop/comments/${payload.postId}`, payload, 
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

const commentSlice = createSlice({
   name: 'comment',
   initialState,
   reducers: {},
   extraReducers: {
      [__getComments.pending]: (state) => {
         state.isLoading = true;
      },
      [__getComments.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.comments = action.payload;
      },
      [__getComments.rejected]: (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      },
      [__modifyComment.pending]: (state) => {
         state.isLoading = true;
      },
      [__modifyComment.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.comment = action.payload;
      },
      [__modifyComment.rejected]: (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      },
      [__deleteComment.pending]: (state) => {
         state.isLoading = true;
      },
      [__deleteComment.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.comment = action.payload;
      },
      [__deleteComment.rejected]: (state, action) => {
         state.isLoading = true;
         state.error = action.payload;
      },
      [__addComment.pending]: (state) => {
         state.isLoading = true;
      },
      [__addComment.fulfilled]: (state, action) => {
         state.isLoading = false;
         console.log(action.payload);
         state.comment = action.payload;
      },
      [__addComment.rejected]: (state, action) => {
         state.isLoading = true;
         state.error = action.payload;
      },
   },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
