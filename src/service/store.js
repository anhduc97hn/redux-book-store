import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./bookList/slice";
import { favouriteSlice } from "./readingList/slice";
import { bookDetailSlice } from "./bookDetail/slice";

const store = configureStore({
    reducer: {
        bookList: bookSlice.reducer,
        readingList: favouriteSlice.reducer, 
        bookDetail: bookDetailSlice.reducer, 
    }
})

export default store; 