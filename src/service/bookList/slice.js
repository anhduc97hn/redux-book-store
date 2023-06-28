import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../apiService';

const fetchData = async ({pageNum, limit, query}) => {
    try {
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const res = await api.get(url);
      return res; 
    } catch (error) {
      return error 
    }
  };
 
export const getBook = createAsyncThunk("bookList/getBook", async(props) => {
    const res = await fetchData(props);
    return res.data;  
})

export const bookSlice = createSlice({
name: "bookList",
initialState: {
    books: [],
    status: null, 
},
extraReducers: (builder) => {
    builder
    .addCase(getBook.pending, (state) => {
        state.status = "loading"
    })
    .addCase(getBook.fulfilled, (state, action) => {
        state.status = null;
        state.books = action.payload; 
    })
    .addCase(getBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; 
    })
}
})

export default bookSlice.reducer; 