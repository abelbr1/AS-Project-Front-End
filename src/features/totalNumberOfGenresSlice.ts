// songsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface totalNumberOfGenresState {
  isLoading: boolean;
  error: string | null;
  totalNumberOfGenres: number;
}

const initialState: totalNumberOfGenresState = {
  isLoading: false,
  error: null,
  totalNumberOfGenres: 0,
};

export const totalNumberOfGenresSlice = createSlice({
  name: "totalNumberOfGenres",
  initialState,
  reducers: {
    getTotalNumberOfGenresFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getTotalNumberOfGenresSuccess: (state, action: PayloadAction<number>) => {
      state.totalNumberOfGenres = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getTotalNumberOfGenresFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTotalNumberOfGenresFetch,
  getTotalNumberOfGenresSuccess,
  getTotalNumberOfGenresFailure,
} = totalNumberOfGenresSlice.actions;
export default totalNumberOfGenresSlice.reducer;
