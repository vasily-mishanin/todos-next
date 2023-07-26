import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState, User } from './types';

const initialState: IAuthState = {
  authState: {
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
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
