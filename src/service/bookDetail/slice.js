import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../apiService';
import { toast} from 'react-toastify';

export const getBookDetail = createAsyncThunk("bookDetail/getBookDetail", async (bookId) => {
    const res = await api.get(`/books/${bookId}`)
    return res.data; 
})

export const addToReadingList = createAsyncThunk("bookDetail/addToReadingList", async (book) => {
    const res = await api.post(`/favorites`, book)
    return res.data; 
})


export const bookDetailSlice = createSlice({
name: "bookDetail",
initialState: {
    book: {},
    status: null, 
},
extraReducers: (builder) => {
    builder
    .addCase(getBookDetail.pending, (state) => {
        state.status = "loading"
    })
    .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null;
        state.book = action.payload; 
    })
    .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; 
        toast(action.error.message);
    })
    builder
    .addCase(addToReadingList.pending, (state) => {
        state.status = "loading"
    })
    .addCase(addToReadingList.fulfilled, (state, action) => {
        state.status = null;
       toast.success("The book has been added to the reading list!")
       
    })
    .addCase(addToReadingList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; 
        toast.error("The book has already been added to the list")
    })
}
})

export default bookDetailSlice.reducer; 