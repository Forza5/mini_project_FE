import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const __getComments = createAsyncThunk(
  "comments/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://54.82.19.91/comment");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComments = createAsyncThunk(
  "comments/postComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://54.82.19.91/comment", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComments = createAsyncThunk(
  "comments/deleteComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(`http://54.82.19.91/comment/${payload}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    //GET
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.comments = action.payload;
    },
    //POST
    [__postComments.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.comments.push(action.payload);
    },
    //DELETE
    [__deleteComments.fulfilled]: (state, action) => {
      state.comments = state.comments.filter((item) => {
        return item.id !== action.meta.arg;
      });
    },
  },
});

export default commentSlice.reducer;
