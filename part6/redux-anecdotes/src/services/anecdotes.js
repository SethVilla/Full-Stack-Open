import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNewAnecdote = async (content) => {
    const response = await axios.post(baseUrl, {
        content,
        votes: 0
    })
    return response.data
}

export const addVoteById = async ({id, votes, content}) => {
    const response = await axios.put(`${baseUrl}/${id}`, {
        votes,
        content
    })
    return response.data
}