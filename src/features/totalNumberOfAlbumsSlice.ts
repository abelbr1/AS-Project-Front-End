import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface totalNumberOfAlbumsState {
  isLoading: boolean;
  error: string | null;
  totalNumberOfAlbums: number;
}

const initialState: totalNumberOfAlbumsState = {
  isLoading: false,
  error: null,
  totalNumberOfAlbums: 0,
};

export const totalNumberOfAlbumsSlice = createSlice({
  name: "totalNumberOfAlbums",
  initialState,
  reducers: {
    getTotalNumberOfAlbumsFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getTotalNumberOfAlbumsSuccess: (state, action: PayloadAction<number>) => {
      state.totalNumberOfAlbums = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getTotalNumberOfAlbumsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTotalNumberOfAlbumsFetch,
  getTotalNumberOfAlbumsSuccess,
  getTotalNumberOfAlbumsFailure,
} = totalNumberOfAlbumsSlice.actions;
export default totalNumberOfAlbumsSlice.reducer;
