import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState, User } from './types';

const initialState: IAuthState = {
  user: {
    id: '',
    email: '',
    username: '',
    isAdmin: false,
    isVerified: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;
