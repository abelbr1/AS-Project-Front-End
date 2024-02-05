import React from "react";
import styled from "@emotion/styled";
import { space, color } from "styled-system";
import { useDispatch } from "react-redux";
import { removeSong } from "../features/songsSlice";
import UpdateModal from "./UpdateModal";

type SongCardProps = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px solid #1db954;
  border-radius: 10px;
  background-color: #f3f4f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  ${space}
  ${color}
`;

const Title = styled.h3`
  margin-bottom: 8px;
  color: #000000;
  font-size: 20px;
`;

const Artist = styled.p`
  margin-bottom: 8px;
  color: #000000;
  font-size: 16px;
`;
const Genre = styled.p`
  margin-bottom: 8px;
  color: #000000;
  font-size: 14px;
`;
const Album = styled.p`
  font-size: 16px;
  font-weight: bold;
  ${color}
`;

const RemoveButton = styled.button`
  background-color: #ef4444;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: #c0392b;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  row-gap: 8px;
`;

const SongCard: React.FC<SongCardProps> = ({
  _id,
  title,
  artist,
  album,
  genre,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeSong(_id));
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Artist>{artist}</Artist>
      <Album color="#000000">{album}</Album>
      <Genre>{genre}</Genre>
      <FlexContainer>
        <UpdateModal
          initialSong={{
            _id,
            title,
            artist,
            album,
            genre,
          }}
        />
        <RemoveButton onClick={handleRemove}>Delete</RemoveButton>
      </FlexContainer>
    </Wrapper>
  );
};

export default SongCard;
