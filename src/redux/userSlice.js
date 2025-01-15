import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    email: null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.token = null;
      state.email = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
