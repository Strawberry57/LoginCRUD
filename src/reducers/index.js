import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    LOGIN_AUTH: (state, action) => {
      state.user = action.payload;
    },
    CREATE_USER: (state, action) => {
      state.user = action.payload;
    },
    UPDATE_USER: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { LOGIN_AUTH, CREATE_USER, UPDATE_USER } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
