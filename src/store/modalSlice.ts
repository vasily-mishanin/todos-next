import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState, Modal } from './types';

const initialState: Modal = {
  id: '',
  isOpen: false,
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
      state.id = '';
      state.isOpen = false;
    },
  },
});

export const { setOpenModal, closeModal } = modalSlice.actions;
