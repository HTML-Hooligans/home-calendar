import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

export type User = {
  displayName?: string | null;
  email?: string | null;
  id?: string;
};

export interface UserState {
  user?: User;
  isLoggedIn?: boolean;
  error?: SerializedError;
}

const initialState: UserState = {
  user: {
    displayName: undefined,
    email: undefined,
    id: undefined,
  },
  isLoggedIn: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
