import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { modalSlice } from './modalSlice';
import { usersSlice } from './usersSlice';

import { todosApi } from './services/todosApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer, //Thunks
    [modalSlice.name]: modalSlice.reducer,
    [usersSlice.name]: usersSlice.reducer, //Thunks
    //RTK Query
    [todosApi.reducerPath]: todosApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([todosApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
