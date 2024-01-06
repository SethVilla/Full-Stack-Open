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

phoneBookRouter.get("/info", (req,res) => {
    Person.find({}).then(result => {
        const localDateTime = new Date();
        res.send("<p>Phonebook has info for " + result.length + " people </p>" +
            "<p>" + localDateTime.toString() + "</p>" )
    }).catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
})

phoneBookRouter.get("/:id", (req,res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})

phoneBookRouter.post("/", (req, res) => {
    const {name, number} = req.body

    if (!name || !number) {
        res.json({
            error: `${!name? 'name is missing\n' : ""} ${!number? 'number is missing' : ""}`
        })
        return;
    }

    const person = new Person({
        name,
        number
    })

    person.save().then(person => {
        res.json(person)
    })

})

phoneBookRouter.delete("/:id", (req,res, next) => {
    const reqId = req.params.id
    Person.findByIdAndDelete(reqId)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

phoneBookRouter.put('/:id', (request, response, next) => {
    const id = request.params.id
    const {name, number} = request.body

    const person = {
        name,
        number
    }

    Person.findByIdAndUpdate(id, person, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

