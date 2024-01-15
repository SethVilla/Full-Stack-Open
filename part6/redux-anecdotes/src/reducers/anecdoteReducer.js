import { createSlice } from '@reduxjs/toolkit'
import {addVoteById, createNewAnecdote, getAll} from "../services/anecdotes.js";

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// export const anecdoteReducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)
//   switch(action.type) {
//     case 'VOTE':
//       return sortAnecdotes(state.map(anecdote => {
//         return anecdote.id === action.payload.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
//       }))
//     case "CREATE_ANECDOTE":
//       return sortAnecdotes([...state, action.payload])
//     default:
//       return state
//   }
// }

// export const vote = (id) => {
//   return {
//     type: "VOTE",
//     payload: {
//       id
//     }
//   }
// }
//
// export const createAnecdote = (content) => {
//   return {
//     type: "CREATE_ANECDOTE",
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

export const sortAnecdotes = (state) => {

  return [...state].sort((a,b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice(
    {
      name: 'anecdotes',
      initialState,
      reducers: {
        // createAnecdote(state, action) {
        //   const content = action.payload.content
        //   // console.log(JSON.parse(JSON.stringify(state)), "JSON")
        //   state.push({
        //     content,
        //     votes: 0,
        //     id: getId()
        //   })
        //   return sortAnecdotes(state)
        // },
        vote(state, action) {
          const id = action.payload.id
          return sortAnecdotes(state.map(anecdote => {
            return anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
          }))
        },
        addAnecdote(state, action) {
          state.push(action.payload)
        },
        setAnecdotes(state, action) {
          return action.payload
        }
      }
    }
)

export const {vote, addAnecdote, setAnecdotes} = anecdoteSlice.actions
export const anecdoteReducer = anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = ({content}) => {
  return async dispatch => {
    const newAnecdote = await createNewAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (payload) => {
  return async dispatch => {
    const newAnecdote = await addVoteById(payload)
    dispatch(vote({id: newAnecdote.id}))
  }
}

