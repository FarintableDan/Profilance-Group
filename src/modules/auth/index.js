import { createSlice } from '@reduxjs/toolkit';
import { users } from "./users";

const initialState = {
  userInfo: null,
  loginModal: false,
  submitError: false,
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {
      const user = users.filter((user) => user.login === action.payload.login && user.password === action.payload.password);
      if (user.length) {
        state.userInfo = user[0];
        state.submitError = false;
        state.loginModal = false;
      } else {
        state.submitError = true;
      }
    },
    toggleLoginModal: (state) => {
      state.loginModal = !state.loginModal;
    },
    logOut: (state) => {
      state.userInfo = null;
    },
    clearSubmitError: (state) => {
      state.submitError = false;
    }
  },
});

export const { auth, toggleLoginModal, logOut, clearSubmitError } = authReducer.actions;
export const selectLoginModal = (state) => state.auth.loginModal;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectUserRole = (state) => state.auth.userInfo !== null && state.auth.userInfo.role;
export const selectSubmitError = (state) => state.auth.submitError;

export default authReducer.reducer;
