import {AnecdoteForm} from "./components/forms/AnecdoteForm.jsx";
import {AnecdoteList} from "./components/AnecdoteList.jsx";
import {Filter} from "./components/Filter.jsx";
import {Notification} from "./components/Notification.jsx";
import {useEffect} from "react";
import {initializeAnecdotes, setAnecdotes} from "./reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(initializeAnecdotes())
    }, []);

  return (
      <div>
          <Notification/>
          <h2>Anecdotes</h2>
          <AnecdoteForm/>
          <Filter/>
          <AnecdoteList/>
      </div>
  )
}

export default App