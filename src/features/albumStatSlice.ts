import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface albumStatState {
  isLoading: boolean;
  error: string | null;
  albumStat: [];
}

const initialState: albumStatState = {
  isLoading: false,
  error: null,
  albumStat: [],
};

export const albumStatSlice = createSlice({
  name: "albumStat",
  initialState,
  reducers: {
    getAlbumStatFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getAlbumStatSuccess: (state, action: PayloadAction<[]>) => {
      state.albumStat = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getAlbumStatFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getAlbumStatFetch, getAlbumStatSuccess, getAlbumStatFailure } =
  albumStatSlice.actions;
export default albumStatSlice.reducer;
