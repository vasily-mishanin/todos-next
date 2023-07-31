import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Modal, ModalTypes } from './types';

const initialState: Modal = {
  id: ModalTypes.NONE,
  isOpen: false,
  data: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<Modal>) => {
      state.id = action.payload.id;
      state.isOpen = action.payload.isOpen;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.id = ModalTypes.NONE;
      state.isOpen = false;
      state.data = {};
    },
  },
});

export const { setOpenModal, closeModal } = modalSlice.actions;
