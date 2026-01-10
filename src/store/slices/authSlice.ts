import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userId = action.payload;
      state.initialized = true; // mark check complete
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.initialized = true; // mark check complete
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});

export const { signIn, signOut, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
