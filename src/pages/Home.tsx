import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Song, getSongsFetch } from "../features/songsSlice";
import styled from "@emotion/styled";
import SongCard from "../components/SongCard";
import Stats from "../components/Stats";

import SongModal from "../components/SongModal";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { songs } = useSelector((state: RootState) => state.songs);
  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  const H1 = styled.h1`
    color: limegreen;
  `;

  const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  `;

  return (
    <div>
      <H1>Music Hunters</H1>

      <SongModal />
      <GridContainer>
        {songs &&
          songs.map((data: Song) => (
            <SongCard
              key={data._id}
              _id={data._id}
              title={data.title}
              artist={data.artist}
              album={data.album}
              genre={data.genre}
            />
          ))}
      </GridContainer>

      <Stats />
    </div>
  );
};

export default Home;
