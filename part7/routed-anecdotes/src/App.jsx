import { useState } from 'react'
import { Outlet } from "react-router-dom";
import {Footer} from "./components/Footer.jsx";
import {Header} from "./components/Header.jsx";
import Notification from "./components/Notification.jsx";



const App = () => {

  // const [notification, setNotification] = useState('')

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)
  //
  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)
  //
  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }
  //
  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
        <Notification/>
        <Header/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default App
