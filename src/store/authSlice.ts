import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  isVerified?: boolean;
}

export interface IAuthState {
  authState: User;
}

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
