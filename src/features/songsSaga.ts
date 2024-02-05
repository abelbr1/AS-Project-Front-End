// songsSaga.ts
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  getSongsSuccess,
  getSongsFetch,
  addSong,
  removeSong,
  updateSong,
} from "./songsSlice";
import {
  getTotalNumberOfSongsFetch,
  getTotalNumberOfSongsSuccess,
} from "./totalNumberOfSongsSlice";
import {
  getTotalNumberOfArtistSuccess,
  getTotalNumberOfArtistFetch,
} from "./totalNumberOfArtistSlice";
import {
  getTotalNumberOfAlbumsSuccess,
  getTotalNumberOfAlbumsFetch,
} from "./totalNumberOfAlbumsSlice";
import {
  getTotalNumberOfGenresFetch,
  getTotalNumberOfGenresSuccess,
} from "./totalNumberOfGenresSlice";
import { getArtistStatFetch, getArtistStatSuccess } from "./artistStatSlice";
import { getAlbumStatFetch, getAlbumStatSuccess } from "./albumStatSlice";
import { getGenreStatFetch, getGenreStatSuccess } from "./genreStatSlice";

import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { Song } from "./songsSlice";

const API_SONGS_URL = "https://song-api-as.onrender.com/song";

function* fetchSongs() {
  try {
    const response: AxiosResponse = yield call(axios.get, API_SONGS_URL);
    const fetchedSongs: [] = response.data;
    yield put(getSongsSuccess(fetchedSongs));
    console.log("Songs fetched:", fetchedSongs);
  } catch (error) {
    console.error("Failed to fetch songs:", error);
  }
}

function* addNewSong(action: PayloadAction<Song>) {
  try {
    const newSong: Song = action.payload;
    yield call(axios.post, API_SONGS_URL, newSong);
    yield put(getSongsFetch());
  } catch (error) {
    console.error("Failed to add new song:", error);
  }
}

function* removeExistingSong(action: PayloadAction<string>) {
  try {
    const songId: string = action.payload;
    yield call(axios.delete, `${API_SONGS_URL}/${songId}`);
    yield put(getSongsFetch());
  } catch (error) {
    console.error("Failed to remove song:", error);
  }
}

function* updateExistingSong(action: PayloadAction<Song>) {
  try {
    const updatedSong: Song = action.payload;
    console.log("Updated song:", updatedSong);
    yield call(axios.patch, `${API_SONGS_URL}/${updatedSong._id}`, updatedSong);
    yield put(getSongsFetch());
  } catch (error) {
    console.error("Failed to update song:", error);
  }
}

function* fetchTotalNumberOfSongs() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      "https://song-api-as.onrender.com/song/stat/totalNumberOfSongs",
    );
    const totalNumberOfSongs: number = response.data.totalNumberOfSongs;
    console.log("Total number of songs:", totalNumberOfSongs);
    yield put(getTotalNumberOfSongsSuccess(totalNumberOfSongs));
  } catch (error) {
    console.error("Failed to fetch total number of songs:", error);
  }
}
function* fetchTotalNumberOfAlbums() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      "https://song-api-as.onrender.com/song/stat/totalNumberOfAlbums",
    );
    const totalNumberOfAlbums: number = response.data.totalNumberOfAlbums;
    console.log("Total number of Albums:", totalNumberOfAlbums);
    yield put(getTotalNumberOfAlbumsSuccess(totalNumberOfAlbums));
  } catch (error) {
    console.error("Failed to fetch total number of Albums:", error);
  }
}
function* fetchTotalNumberOfArtist() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      "https://song-api-as.onrender.com/song/stat/totalNumberOfArtist",
    );
    const totalNumberOfArtist: number = response.data.totalNumberOfArtist;
    console.log("Total number of Artist:", totalNumberOfArtist);
    yield put(getTotalNumberOfArtistSuccess(totalNumberOfArtist));
  } catch (error) {
    console.error("Failed to fetch total number of Artis:", error);
  }
}
function* fetchTotalNumberOfGenres() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      "https://song-api-as.onrender.com/song/stat/totalNumberOfGenres",
    );
    const totalNumberOfGenres: number = response.data.totalNumberOfGenres;
    console.log("Total number of Geres:", totalNumberOfGenres);
    yield put(getTotalNumberOfGenresSuccess(totalNumberOfGenres));
  } catch (error) {
    console.error("Failed to fetch total number of Genres:", error);
  }
}
function* fetchArtistStat() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      "https://song-api-as.onrender.com/song/stat/ArtistStat",
    );
    const artistStat: [] = response.data.songsAndAlbumsEachArtist;
    console.log("artist stats:", artistStat);
    yield put(getArtistStatSuccess(artistStat));
  } catch (error) {
    console.error("Failed to fetch artist stats:", error);
  }
}
function* fetchAlbumStat() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      "https://song-api-as.onrender.com/song/stat/AlbumStat",
    );
    const albumStat: [] = response.data.songsOfEachAlbum;
    console.log("album stats:", albumStat);
    yield put(getAlbumStatSuccess(albumStat));
  } catch (error) {
    console.error("Failed to fetch artist stats:", error);
  }
}
function* fetchGenreStat() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      "https://song-api-as.onrender.com/song/stat/GenreStat",
    );
    const genreStat: [] = response.data.songsOfEachGenre;
    console.log("genre stats:", genreStat);
    yield put(getGenreStatSuccess(genreStat));
  } catch (error) {
    console.error("Failed to fetch artist stats:", error);
  }
}

function* watchAddSongRequest() {
  yield takeLatest(addSong.type, addNewSong);
}

function* watchRemoveSongRequest() {
  yield takeLatest(removeSong.type, removeExistingSong);
}

function* watchUpdateSongRequest() {
  yield takeLatest(updateSong.type, updateExistingSong);
}

function* watchGetSongsRequest() {
  yield takeLatest(getSongsFetch.type, fetchSongs);
}

function* watchGetTotalNumberOfSongsRequest() {
  yield takeLatest(getTotalNumberOfSongsFetch.type, fetchTotalNumberOfSongs);
}
function* watchGetTotalNumberOfArtistRequest() {
  yield takeLatest(getTotalNumberOfArtistFetch.type, fetchTotalNumberOfArtist);
}
function* watchGetTotalNumberOfAlbumsRequest() {
  yield takeLatest(getTotalNumberOfAlbumsFetch.type, fetchTotalNumberOfAlbums);
}
function* watchGetTotalNumberOfGenresRequest() {
  yield takeLatest(getTotalNumberOfGenresFetch.type, fetchTotalNumberOfGenres);
}
function* watchGetArtistStatRequest() {
  yield takeLatest(getArtistStatFetch.type, fetchArtistStat);
}
function* watchGetAlbumStatRequest() {
  yield takeLatest(getAlbumStatFetch.type, fetchAlbumStat);
}
function* watchGetGenreStatRequest() {
  yield takeLatest(getGenreStatFetch.type, fetchGenreStat);
}

export function* songsSaga() {
  yield all([
    fork(watchGetSongsRequest),
    fork(watchAddSongRequest),
    fork(watchRemoveSongRequest),
    fork(watchUpdateSongRequest),
    fork(watchGetTotalNumberOfSongsRequest),
    fork(watchGetTotalNumberOfArtistRequest),
    fork(watchGetTotalNumberOfAlbumsRequest),
    fork(watchGetTotalNumberOfGenresRequest),
    fork(watchGetArtistStatRequest),
    fork(watchGetAlbumStatRequest),
    fork(watchGetGenreStatRequest),
  ]);
}
