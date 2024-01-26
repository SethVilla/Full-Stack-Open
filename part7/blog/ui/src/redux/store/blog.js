import {configureStore} from '@reduxjs/toolkit';
import {notificationReducer} from '../reducers/notification.js';
import {blogReducer} from '../reducers/blog.js';
import {userReducer} from '../reducers/user.js';

export const blogStore = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    blogs: blogReducer,
  },
});
