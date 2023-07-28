import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IAuthState,
  ILoginCreds,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  User,
  VerifyEmailResponse,
} from './types';
import axios from 'axios';

export const signup = createAsyncThunk(
  'auth/signup',
  async (formData: ILoginCreds, thunkAPI) => {
    const response: LoginResponse = await axios.post(
      '/api/users/signup',
      formData
    );
    return response.data;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData: ILoginCreds, thunkAPI) => {
    const response: LoginResponse = await axios.post(
      '/api/users/login',
      formData
    );
    const { message, success, user } = response.data;
    const { _id, username, email, isAdmin, isVerified } = user;
    return {
      message,
      success,
      user: { id: _id, username, email, isAdmin, isVerified },
    };
  }
);

export const me = createAsyncThunk('auth/me', async (thunkAPI) => {
  const response: MeResponse = await axios.get('/api/users/me');
  const { _id, username, email, isAdmin, isVerified } = response.data.data;
  const me: User = {
    id: _id,
    username,
    email,
    isAdmin,
    isVerified,
  };
  return me;
});

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  const response: LogoutResponse = await axios.get('/api/users/logout');
  console.log('logout', response.data);
  return response.data;
});

export const verifyUserEmail = createAsyncThunk(
  'auth/verifyUserEmail',
  async ({ token }: { token: string }, thunkAPI) => {
    const response: VerifyEmailResponse = await axios.post(
      'api/users/verifyemail',
      { token }
    );
    return response.data;
  }
);

const initialState: IAuthState = {
  user: {
    id: '',
    email: '',
    username: '',
    isAdmin: false,
    isVerified: false,
  },
  loading: 'idle',
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = 'pending';
        state.error = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = 'idle';
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = 'idle';
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(login.pending, (state, action) => {
        state.loading = 'pending';
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'idle';
        state = initialState;
      })
      .addCase(me.pending, (state, action) => {
        state.loading = 'pending';
        state.error = '';
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload;
        state.error = '';
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = 'idle';
        state = initialState;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = 'pending';
        state.error = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = 'idle';
        state = initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = 'idle';
        state = initialState;
      })
      .addCase(verifyUserEmail.pending, (state, action) => {
        state.loading = 'pending';
        state.error = '';
      })
      .addCase(verifyUserEmail.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user.isVerified = true;
      })
      .addCase(verifyUserEmail.rejected, (state, action) => {
        state.loading = 'idle';
        state.user.isVerified = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const { setAuthState } = authSlice.actions;
