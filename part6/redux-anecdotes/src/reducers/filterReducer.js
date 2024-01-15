import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

// export const filterReducer = (state = initialState, action) => {
//     console.log('state now: ', state)
//     console.log('action', action)
//     switch(action.type) {
//         case 'KEYWORD':
//             return action.payload.keyword
//         // case 'KEYWORD':
//         //     return sortAnecdotes(state.anecdotes.filter(anecdote => {
//         //         return anecdote.content.includes(action.keyWord)
//         //     }))
//         default:
//             return state
//     }
// }

export const KeyWordFilterChange = (keyword) => {
    return {
        type: "KEYWORD",
        payload: {keyword}
    }
}

const filterSlice = createSlice(
    {
        name: 'filter',
        initialState,
        reducers: {
            onKeyWordChange(state, action) {
                console.log(state)
                return action.payload.keyword
            }
        }
    }
)

export const {onKeyWordChange} = filterSlice.actions

export const filterReducer = filterSlice.reducer