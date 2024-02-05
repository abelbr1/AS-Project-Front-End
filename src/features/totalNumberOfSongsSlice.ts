// songsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface totalNumberOfSongsState {
  isLoading: boolean;

  error: string | null;
  totalNumberOfSongs: number;
}

const initialState: totalNumberOfSongsState = {
  isLoading: false,
  error: null,
  totalNumberOfSongs: 0,
};

export const totalNumberOfSongsSlice = createSlice({
  name: "totalNumberOfSongs",
  initialState,
  reducers: {
    getTotalNumberOfSongsFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getTotalNumberOfSongsSuccess: (state, action: PayloadAction<number>) => {
      state.totalNumberOfSongs = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getTotalNumberOfSongsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTotalNumberOfSongsFetch,
  getTotalNumberOfSongsSuccess,
  getTotalNumberOfSongsFailure,
} = totalNumberOfSongsSlice.actions;
export default totalNumberOfSongsSlice.reducer;
