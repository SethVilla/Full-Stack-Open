import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  type: '',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    reset() {
      return {
        message: null,
        type: '',
      };
    },
  },
});

export const {notify, reset} = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;

export const startNotification = payload => {
  let notificationTimer;

  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }

  return async dispatch => {
    dispatch(notify(payload.notification));
    setTimeout(() => {
      dispatch(reset());
    }, payload.timer);
  };
};
