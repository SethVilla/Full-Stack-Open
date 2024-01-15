import { configureStore } from '@reduxjs/toolkit'
import {anecdoteReducer} from './reducers/anecdoteReducer'
import {filterReducer} from "./reducers/filterReducer.js";
import {notificationReducer} from "./reducers/notificationReducer.js";

export const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})