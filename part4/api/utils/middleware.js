import {info, error} from "./logger.js";

export const requestLogger = (request, response, next) => {
    info('Method:', request.method)
    info('Path:  ', request.path)
    info('Body:  ', request.body)
    info('---')
    next()
}

export const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (err, request, response, next) => {
    error(err.message)

    if (err.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return response.status(400).json({ error: err.message })
    }

    next(err)
}