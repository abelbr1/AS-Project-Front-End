import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface genreStatState {
  isLoading: boolean;
  error: string | null;
  genreStat: [];
}

const initialState: genreStatState = {
  isLoading: false,
  error: null,
  genreStat: [],
};

export const genreStatSlice = createSlice({
  name: "genreStat",
  initialState,
  reducers: {
    getGenreStatFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getGenreStatSuccess: (state, action: PayloadAction<[]>) => {
      state.genreStat = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getGenreStatFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getGenreStatFetch, getGenreStatSuccess, getGenreStatFailure } =
  genreStatSlice.actions;
export default genreStatSlice.reducer;
