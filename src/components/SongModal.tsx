import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../features/songsSlice";
import styled from "@emotion/styled";
import { space, typography, SpaceProps, TypographyProps } from "styled-system";
import { Modal } from "antd";

interface FormInputProps extends SpaceProps, TypographyProps {}

const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
`;

const FormTitle = styled.h2<SpaceProps & TypographyProps>`
  margin-bottom: 20px;
  ${space}
  ${typography}
  color: #333; /* Dark text color */
`;

const FormLabel = styled.label<TypographyProps>`
  display: block;
  margin-bottom: 8px;
  ${typography}
  color: #333; /* Dark text color */
`;

const FormInput = styled.input<FormInputProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  ${space}
  ${typography}
`;

const SongModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  const handleAddSong = () => {
    dispatch(addSong(newSong));
    setIsModalOpen(false);
    setNewSong({ title: "", artist: "", album: "", genre: "" });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const AddButton = styled.button`
    background-color: #1db954; /* Spotify green color */
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #168f3f; /* Darker shade on hover */
    }
  `;

  return (
    <>
      <AddButton onClick={showModal}>Add New Song</AddButton>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleAddSong}
        onCancel={handleCancel}
      >
        <FormContainer>
          <FormTitle fontSize={20} mb={4}>
            Add New Song
          </FormTitle>
          <form>
            <FormLabel fontSize={16}>Title:</FormLabel>
            <FormInput
              type="text"
              name="title"
              value={newSong.title}
              onChange={handleInputChange}
              fontSize={14}
              mb={2}
            />

            <FormLabel fontSize={16}>Artist:</FormLabel>
            <FormInput
              type="text"
              name="artist"
              value={newSong.artist}
              onChange={handleInputChange}
              fontSize={14}
              mb={2}
            />

            <FormLabel fontSize={16}>Album:</FormLabel>
            <FormInput
              type="text"
              name="album"
              value={newSong.album}
              onChange={handleInputChange}
              fontSize={14}
              mb={2}
            />

            <FormLabel fontSize={16}>Genre:</FormLabel>
            <FormInput
              type="text"
              name="genre"
              value={newSong.genre}
              onChange={handleInputChange}
              fontSize={14}
              mb={3}
            />
          </form>
        </FormContainer>
      </Modal>
    </>
  );
};

export default SongModal;
