import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../api/types/auth';

const initialState: User = {
  id: '',
  username: '',
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearUserInfo: (state) => {
      state.id = '';
      state.username = '';
      state.email = '';
    },
  },
});

export const { 
  setUserInfo, 
  updateUserName, 
  updateUserEmail,
  clearUserInfo 
} = userSlice.actions;
export default userSlice.reducer;
