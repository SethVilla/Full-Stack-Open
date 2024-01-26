import { configureStore } from '@reduxjs/toolkit'
import {notificationReducer} from '../reducers/notification.js';

export const blogStore = configureStore({
  reducer: {
    notification: notificationReducer
  }
})