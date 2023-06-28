import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiService";
import { toast } from "react-toastify";

export const getReadingList = createAsyncThunk("readingList/get", async () => {
  const res = await api.get(`/favorites`);
  return res.data;
});

export const removeFromReading = createAsyncThunk(
  "readingList/removed",
  async (removedBookId) => {
    const res = await api.delete(`/favorites/${removedBookId}`);
    return res.data;
  }
);

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    books: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = null;
        state.books = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Sorry, we're maintaining our server. We'll keep you posted when our service is available")
      });
    builder
      .addCase(removeFromReading.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromReading.fulfilled, (state, action) => {
        state.status = null;
        toast.success("The book has been removed");
      })
      .addCase(removeFromReading.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export default favouriteSlice.reducer;
