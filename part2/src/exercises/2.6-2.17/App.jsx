import {useEffect, useState} from 'react'
import {AddPerson} from "./AddPerson.jsx";
import {PhoneBookList} from "./PhoneBookList.jsx";
import {PhoneBookFilter} from "./PhoneBookFilter.jsx";
import axios from "axios"
import {addNewPerson, deletePerson, updatePerson} from "../services/services.js";
import {Notification} from "./Notification.jsx";
export const App = () => {
    const [persons, setPersons] = useState([])
    const [newPerson, setNewPerson] = useState({name: '', number: ''})
    const [filteredPersons, setFilteredPersons] = useState([])
    const [filter, setFilter] = useState("")
    const [notification, setNotification] = useState({
        type: "",
        message: null
    })

    useEffect(() => {
       axios.get('/api/persons').then(res =>
       {
           setPersons(res.data)
           setFilteredPersons(res.data)

       })

    }, []);

    const addPerson = async (e) => {
        e.preventDefault()
        if (persons.find((person) =>
            person.name === newPerson.name || person.number === newPerson.number)
        ) {
            if (confirm(`${newPerson.name} is already added in the phone book, replace the old number with a new one`)) {
                const existingPerson = persons.find(({name}) => name === newPerson.name)
                const res = await updatePerson({...existingPerson, number: newPerson.number})
                const newPersons = persons.filter(({name}) => name !== newPerson.name )
                newPersons.push(res)
                setPersons(newPersons)
                if (filter) {
                    setFilteredPersons(newPersons.filter(person =>
                        (person.name.toLowerCase() + person.number.toLowerCase()).toLowerCase().includes(filter)))
                } else {
                    setFilteredPersons(newPersons)
                }
            }
        } else {
            const res = await addNewPerson(newPerson)
            if (res) {
                const newPersons = [...persons, res]
                setPersons(newPersons)
                setNotification({type: "success", message: `Added ${res.name}`})
                setTimeout(() => {
                    setNotification({type: "", message: null})
                }, 3000)
                if (filter) {
                    setFilteredPersons(newPersons.filter(person =>
                        (person.name.toLowerCase() + person.number.toLowerCase()).toLowerCase().includes(filter)))
                } else {
                    setFilteredPersons(newPersons)
                }
            }
            }
    }

    const onDeletePerson = async ({name, id}) => {
        if(window.confirm(`Delete ${name}?`)) {
            const res = await deletePerson(id)
            if (res.success) {
                setPersons(prevState => {
                    const currentPersons = prevState.filter(person => person.id !== id)
                    if (filter) {
                        setFilteredPersons(currentPersons.filter(person =>
                            (person.name.toLowerCase() + person.number.toLowerCase()).toLowerCase().includes(filter)))
                    } else {
                        setFilteredPersons(currentPersons)
                    }
                    return currentPersons
                })
                setNotification({type: "success", message: `Information for ${name} has been removed from server`})
                setTimeout(() => {
                    setNotification({type: "", message: null})
                }, 3000)
            } else {
                setNotification({type: "error", message: `Information for ${name} has already been removed from server`})
                setTimeout(() => {
                    setNotification({type: "", message: null})
                }, 3000)
            }
        }
    }

    const onInputChange = ({target: {name, value}}) => {
            setNewPerson(prevState =>
                ({...prevState, [name]: value}))
    }
    const onFilterChange = ({target: {value}}) => {
        if (value) {
            setFilteredPersons(persons.filter(person =>
                (person.name.toLowerCase() + person.number.toLowerCase()).toLowerCase().includes(value)))
        } else {
            setFilteredPersons([...persons])
        }

    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification}/>
            <PhoneBookFilter onFilterChange={onFilterChange} />
            <AddPerson addPerson={addPerson} onInputChange={onInputChange}/>
            <PhoneBookList filteredPersons={filteredPersons} onDeletePerson={onDeletePerson} />
        </div>
    )
}