import { SafeUser } from './../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './';

interface UserState {
  token: string;
  user: null | SafeUser;
}

const initialUserState: UserState = {
  token: '',
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<SafeUser>) => {
      state.user = action.payload;
    },
  },
});

export const userToken = (state: RootState) => state.user.token;
export const { setToken } = userSlice.actions;
export default userSlice.reducer;
