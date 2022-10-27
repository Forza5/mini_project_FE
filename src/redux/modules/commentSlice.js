import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const __getComments = createAsyncThunk(
  "GET_COMMENT_BY_ID",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `https://tastekim.shop/comments/${payload}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  "MODIFY_COMMENT",
  async (payload, thunkAPI) => {
    try {
      axios.put(
        `https://tastekim.shop/comments/${payload.commentId}`,
        {
          comment: payload.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  "DELETE_POST",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await axios.delete(`https://tastekim.shop/comments/${payload}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      thunkAPI.dispatch(__getComments());
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __getCommentsNum = createAsyncThunk(
//    'GET_COMMENT_NUM',
//    async (payload, thunkAPI) => {
//       try {
//          const data = await axios.get(
//             `https://tastekim.shop/comments/length/${payload}`,
//             {
//                headers: {
//                   'Content-Type': 'application/json',
//                   Authorization: `Bearer ${localStorage.getItem('token')}`,
//                },
//             }
//          );
//          return thunkAPI.fulfillWithValue(data.data.data);
//       } catch (error) {
//          return thunkAPI.rejectWithValue(error);
//       }
//    }
// );

//   async (payload, thunkAPI) => {
//     console.log(payload);
//     try {
//       const data = await axios.get(`https://tastekim.shop/comments/${payload}`);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const __postComments = createAsyncThunk(
//   "comments/postComments",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.post("http://54.82.19.91/comment", payload);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const __deleteComments = createAsyncThunk(
//   "comments/deleteComments",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.delete(`http://54.82.19.91/comment/${payload}`);
//       return data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

const commentSlice = createSlice({
  name: "comment",
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
      state.post = action.payload;
    },
    [__deleteComment.pending]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    // [__getCommentsNum.pending]: (state) => {
    //   state.isLoading = false;
    // },
    // [__getCommentsNum.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   console.log(action.payload)
    //   state.commentnum = action.payload;
    // },
    // [__getCommentsNum.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // }
  },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
