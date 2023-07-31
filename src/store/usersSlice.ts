import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UsersResponse, UsersState } from './types';

const initialState: UsersState = { users: [], loading: 'idle', error: '' };

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (thunkAPI) => {
    const res = await axios.get('/api/users');
    const users = res.data.data;
    return users;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = 'pending';
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = '';
        state.loading = 'idle';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'idle';
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});
