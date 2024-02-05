// songsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface totalNumberOfArtistState {
  isLoading: boolean;

  error: string | null;
  totalNumberOfArtist: number;
}

const initialState: totalNumberOfArtistState = {
  isLoading: false,
  error: null,
  totalNumberOfArtist: 0,
};

export const totalNumberOfArtistSlice = createSlice({
  name: "totalNumberOfArtist",
  initialState,
  reducers: {
    getTotalNumberOfArtistFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getTotalNumberOfArtistSuccess: (state, action: PayloadAction<number>) => {
      state.totalNumberOfArtist = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getTotalNumberOfArtistFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTotalNumberOfArtistFetch,
  getTotalNumberOfArtistSuccess,
  getTotalNumberOfArtistFailure,
} = totalNumberOfArtistSlice.actions;
export default totalNumberOfArtistSlice.reducer;
