import { useState, useEffect } from 'react'
import axios from 'axios'
import {useResource} from "./hooks/useResource.js";

const noteUrl = 'http://localhost:3005/notes'
const personUrl = 'http://localhost:3005/persons'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource(noteUrl)
  const [persons, personService] = useResource(personUrl)

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    await noteService.create({ url: noteUrl, resource: {content: content.value}})
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    await personService.create({ url: personUrl, resource: {name: name.value, number: number.value}})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App