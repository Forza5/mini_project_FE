import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movie: [],
    isLoading: false,
    error: null,
};

export const __getPost = createAsyncThunk(
    "GET_POST",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`http://54.82.19.91/posts/${payload}`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                 },
            }
            );
            console.log(data);
            return thunkAPI.fulfillWithValue(data.data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        };
    }
);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        [__getPost.pending]: (state) => {
            state.isLoading = true;
        },
        [__getPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.post = action.payload;
        },
        [__getPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const {} = postSlice.actions;
export default postSlice.reducer;