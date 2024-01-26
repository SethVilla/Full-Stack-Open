import {createSlice} from '@reduxjs/toolkit';

const initLocalStorage = () => {
  const userJson = window.localStorage.getItem('userDetails');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

const initialState = initLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export const userReducer = userSlice.reducer;
