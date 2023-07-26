import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { modalSlice } from './modalSlice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
