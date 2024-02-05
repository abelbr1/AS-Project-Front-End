import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Song = {
  _id: string;
  album: string;
  title: string;
  artist: string;
  genre: string;
};

interface SongsState {
  isLoading: boolean;
  songs: Song[];
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  isLoading: false,
  error: null,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getSongsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    addSong: (state, action: PayloadAction<Partial<Song>>) => {
      const newSong: Song = {
        _id: uuidv4(),
        album: action.payload.album || "",
        title: action.payload.title || "",
        artist: action.payload.artist || "",
        genre: action.payload.genre || "",
      };
      state.songs.push(newSong);
    },
    removeSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    updateSong: (state, action: PayloadAction<Partial<Song>>) => {
      const { _id } = action.payload;
      const existingSong = state.songs.find((song) => song._id === _id);

      if (existingSong) {
        Object.assign(existingSong, action.payload);
      }
    },
  },
});

export const {
  getSongsFetch,
  getSongsSuccess,
  getSongsFailure,
  addSong,
  removeSong,
  updateSong,
} = songsSlice.actions;
export default songsSlice.reducer;
