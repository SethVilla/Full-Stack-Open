import {Person} from "../models/person.js";
import express from 'express'
export const phoneBookRouter = express.Router()

// middleware that is specific to this router
// phoneBookRouter.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// })

phoneBookRouter.get("/", (req,res) => {
    Person.find({}).then(result => {
        res.json(result)
    }).catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
})

// app.get("/api/persons/:id", (req,res) => {
//     const id = req.params.id
//     const person = mockData.find((user) => user.id === Number(id))
//     if (person) {
//         res.json(person)
//     } else {
//         res.status(404).end()
//     }
// })
//
// app.post("/api/persons", (req, res) => {
//     const {name, number} = req.body
//     const id = generateId()
//     const newEntry = {
//         id,
//         name,
//         number
//     }
//
//     if (!name || !number) {
//         res.json({
//             error: `${!name? 'name is missing\n' : ""} ${!number? 'number is missing' : ""}`
//         })
//         return
//     }
//
//     if (mockData.find((entry) => entry.name.toLowerCase() === name.toLowerCase())) {
//         res.json({error: "the name already exists in the phonebook"})
//         return;
//     }
//
//     mockData.push(newEntry)
//     res.json(newEntry).end()
//
// })
//
// app.delete("/api/persons/:id", (req,res) => {
//     const reqId = req.params.id
//     setMockData(mockData.filter(({id}) => id !== Number(reqId)))
//     res.status(204).end()
// })
//
// app.get("/api/info", (req,res) => {
//
//     const phoneBookSize = mockData.length
//     const localDateTime = new Date();
//
//     res.send("<p>Phonebook has info for " + phoneBookSize + " people </p>" +
//         "<p>" + localDateTime.toString() + "</p>" )
// })