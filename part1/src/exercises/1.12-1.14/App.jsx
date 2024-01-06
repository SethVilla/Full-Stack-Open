import { useState } from 'react'

export const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const initVotes = anecdotes.map(() => 0)
    const findMostVotesIndex = (votes) => {
        let index = 0;
        votes.forEach((vote, i, votes) => {
            if (votes[index] < votes[i]) {
                index = i;
            }
        })
        return index
    }

    const generateRandomInt = (n) => Math.floor(Math.random() * (n));
    const [selected, setSelected] = useState(() => generateRandomInt(anecdotes.length))
    const [votes, setVotes] = useState(initVotes)
    const [mostVotesIndex, setMostVotesIndex] = useState(() => findMostVotesIndex(votes))
    const onVote = () => {
        setVotes(prevState => {
            const newVotes = [...prevState]
            newVotes[selected] = ++newVotes[selected]
            setMostVotesIndex(findMostVotesIndex(newVotes))
            return newVotes
        })
    }
    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>{`has ${votes[selected]} votes`}</p>
            <div style={{display: "flex", gap: "8px"}}>
                <button onClick={onVote} name="vote">vote</button>
                <button onClick={() => setSelected(generateRandomInt(anecdotes.length))} name="anecdote">next anecdote
                </button>
            </div>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[mostVotesIndex]}</p>
            <p>{`has ${votes[mostVotesIndex]} votes`}</p>
        </div>
    )
}