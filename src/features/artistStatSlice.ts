import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface artistStatState {
  isLoading: boolean;
  error: string | null;
  artistStat: [];
}

const initialState: artistStatState = {
  isLoading: false,
  error: null,
  artistStat: [],
};

export const artistStatSlice = createSlice({
  name: "artistStat",
  initialState,
  reducers: {
    getArtistStatFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getArtistStatSuccess: (state, action: PayloadAction<[]>) => {
      state.artistStat = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getArtistStatFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getArtistStatFetch,
  getArtistStatSuccess,
  getArtistStatFailure,
} = artistStatSlice.actions;
export default artistStatSlice.reducer;
