import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSong } from "../features/songsSlice";
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

const UpdateModal: React.FC<{
  initialSong: {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  };
}> = ({ initialSong }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    _id: "",
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setNewSong(initialSong);
  }, [initialSong]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateSong(newSong));
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const UpdateButton = styled.button`
    background-color: #22c55e;
    color: #fff;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #168f3f;
    }
  `;

  return (
    <>
      <UpdateButton onClick={showModal}>Update</UpdateButton>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <FormContainer>
          <FormTitle fontSize={20} mb={4}>
            Update
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

export default UpdateModal;
