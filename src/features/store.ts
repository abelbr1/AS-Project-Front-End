import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "./songsSlice";
import totalNumberOfSongsReducer from "./totalNumberOfSongsSlice";
import totalNumberOfArtistReducer from "./totalNumberOfArtistSlice";
import totalNumberOfAlbumsReducer from "./totalNumberOfAlbumsSlice";
import totalNumberOfGenresReducer from "./totalNumberOfGenresSlice";
import artistStatReducer from "./artistStatSlice";
import albumStatReducer from "./albumStatSlice";
import genreStatReducer from "./genreStatSlice";
import { songsSaga } from "./songsSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    songs: songsReducer,
    totalNumberOfSongs: totalNumberOfSongsReducer,
    totalNumberOfArtist: totalNumberOfArtistReducer,
    totalNumberOfAlbums: totalNumberOfAlbumsReducer,
    totalNumberOfGenres: totalNumberOfGenresReducer,
    artistStat: artistStatReducer,
    albumStat: albumStatReducer,
    genreStat: genreStatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(songsSaga);

export type RootState = ReturnType<typeof store.getState>;
