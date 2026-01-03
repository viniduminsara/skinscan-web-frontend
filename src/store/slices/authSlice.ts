import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userId = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
