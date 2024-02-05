import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { space, typography, SpaceProps, TypographyProps } from "styled-system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { getTotalNumberOfSongsFetch } from "../features/totalNumberOfSongsSlice";
import { getTotalNumberOfArtistFetch } from "../features/totalNumberOfArtistSlice";
import { getTotalNumberOfAlbumsFetch } from "../features/totalNumberOfAlbumsSlice";
import { getTotalNumberOfGenresFetch } from "../features/totalNumberOfGenresSlice";
import { getArtistStatFetch } from "../features/artistStatSlice";
import { getAlbumStatFetch } from "../features/albumStatSlice";
import { getGenreStatFetch } from "../features/genreStatSlice";

interface WrapperProps extends SpaceProps {}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  ${space}
`;

interface StatisticProps extends TypographyProps, SpaceProps {}

const Statistic = styled.p<StatisticProps>`
  ${typography}
  ${space}
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  font-weight: semi-bold;
`;

interface HeadingProps extends TypographyProps, SpaceProps {}

const Heading = styled.h2<HeadingProps>`
  ${typography}
  ${space}
  border-bottom: 2px solid #1DB954;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  margin-bottom: 30px;
`;

const Stats: React.FC = () => {
  const dispatch = useDispatch();
  const { totalNumberOfSongs } = useSelector(
    (state: RootState) => state.totalNumberOfSongs,
  );
  const { totalNumberOfArtist } = useSelector(
    (state: RootState) => state.totalNumberOfArtist,
  );

  const { totalNumberOfAlbums } = useSelector(
    (state: RootState) => state.totalNumberOfAlbums,
  );
  const { totalNumberOfGenres } = useSelector(
    (state: RootState) => state.totalNumberOfGenres,
  );
  const { artistStat } = useSelector((state: RootState) => state.artistStat);
  const { albumStat } = useSelector((state: RootState) => state.albumStat);
  const { genreStat } = useSelector((state: RootState) => state.genreStat);

  useEffect(() => {
    dispatch(getTotalNumberOfSongsFetch());
    dispatch(getTotalNumberOfArtistFetch());
    dispatch(getTotalNumberOfAlbumsFetch());
    dispatch(getTotalNumberOfGenresFetch());
    dispatch(getArtistStatFetch());
    dispatch(getAlbumStatFetch());
    dispatch(getGenreStatFetch());
  }, [dispatch]);

  return (
    <Wrapper p={4}>
      <div>
        <Heading fontSize={24} mb={4}>
          Overall Statistics
        </Heading>
        <Statistic fontSize={18} mb={2}>
          Total Songs: {totalNumberOfSongs}
        </Statistic>
        <Statistic fontSize={18} mb={2}>
          Total Artists: {totalNumberOfArtist}
        </Statistic>

        <Statistic fontSize={18} mb={2}>
          Total Albums: {totalNumberOfAlbums}
        </Statistic>
        <Statistic fontSize={18} mb={2}>
          Total Genres: {totalNumberOfGenres}
        </Statistic>
      </div>

      <div>
        <Heading fontSize={24} mb={4}>
          Artist Statistics
        </Heading>
        {artistStat.length > 0 ? (
          artistStat.map(
            (stats: { artist: string; songs: number; albums: number }) => (
              <CardContainer key={stats.artist}>
                <Statistic fontSize={18} mb={2}>
                  Artist: {stats.artist}
                </Statistic>
                <Statistic fontSize={18} mb={2}>
                  Songs: {stats.songs}
                </Statistic>
                <Statistic fontSize={18} mb={4}>
                  Albums: {stats.albums}
                </Statistic>
              </CardContainer>
            ),
          )
        ) : (
          <Statistic fontSize={18} mb={2}>
            No artist statistics available
          </Statistic>
        )}
      </div>
      <div>
        <Heading fontSize={24} mb={4}>
          Genre Statistics
        </Heading>
        {genreStat.map((stats: { genre: string; songs: number }) => (
          <Statistic key={stats.genre} fontSize={18} mb={2}>
            {stats.genre}: {stats.songs} {"songs"}
          </Statistic>
        ))}
      </div>
      <div>
        <Heading fontSize={24} mb={4}>
          Album Statistics
        </Heading>
        {albumStat.map(
          (stats: { artist: string; songs: number; album: string }) => (
            <CardContainer key={stats.album}>
              <Statistic fontSize={18} mb={4}>
                Album: {stats.album}
              </Statistic>
              <Statistic fontSize={18} mb={2}>
                Songs: {stats.songs}
              </Statistic>
              <Statistic fontSize={18} mb={2}>
                Artist: {stats.artist}
              </Statistic>
            </CardContainer>
          ),
        )}
      </div>
    </Wrapper>
  );
};

export default Stats;
