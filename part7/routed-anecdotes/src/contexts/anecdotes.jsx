import {createContext, useContext, useReducer, useState} from 'react';

const initialNotification = [
    {
        content: 'If it hurts, do it more often',
        author: 'Jez Humble',
        info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
        votes: 0,
        id: 1
    },
    {
        content: 'Premature optimization is the root of all evil',
        author: 'Donald Knuth',
        info: 'http://wiki.c2.com/?PrematureOptimization',
        votes: 0,
        id: 2
    }
]
const AnecdotesReducer = (anecdotes, action) => {
    switch (action.type) {
        case 'CREATE_NEW': {
            return [...anecdotes, action.payload];
        }
        case 'reset': {
            return {
                ...initialNotification
            }
        }
        default: {
            return anecdotes;
        }
    }
}

const AnecdotesContext = createContext(null);

const AnecdotesDispatchContext = createContext(null);

export const AnecdotesProvider = ({ children }) => {
    const [anecdotes, dispatch] = useReducer(
        AnecdotesReducer,
        initialNotification
    );

    return (
        <AnecdotesContext.Provider value={anecdotes}>
            <AnecdotesDispatchContext.Provider value={dispatch}>
                {children}
            </AnecdotesDispatchContext.Provider>
        </AnecdotesContext.Provider>
    );
}

export const useAnecdotes = () => {
    return useContext(AnecdotesContext);
}

export const useAnecdotesDispatch = () => {
    return useContext(AnecdotesDispatchContext);
}
