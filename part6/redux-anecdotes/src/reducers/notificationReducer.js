import {createSlice} from '@reduxjs/toolkit'
import {addVoteById} from "../services/anecdotes.js";
import {vote} from "./anecdoteReducer.js";

const initialState = {
    message: null,
    type: ''
}
const notificationSlice = createSlice(
    {
        name: 'notification',
        initialState,
        reducers: {
            notify(state, action) {
                console.log(action)
                return {
                    ...action.payload
                }
            },
            reset () {
                return {
                    message: null,
                    type: ''
                }
            }
        }
    }
)

export const {notify, reset} = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer

export const startNotification = (payload) => {

    let notificationTimer;

    if (notificationTimer) {
        clearTimeout(notificationTimer)
    }

    return async dispatch => {
        dispatch(notify(payload.notification))
        setTimeout(() => {
            dispatch(reset())
        }, payload.timer)
    }
}