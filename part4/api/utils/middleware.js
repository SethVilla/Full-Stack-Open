import {info, error} from "./logger.js";
import {User} from "../models/users.js";
import jwt from "jsonwebtoken";
import {CustomError} from "./CustomError.js";

export const requestLogger = (request, response, next) => {
    info('Method:', request.method)
    info('Path:  ', request.path)
    info('Body:  ', request.body)
    info('---')
    next()
}

export const extractAndVerifyToken = async (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization?.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!decodedToken.id) {
            throw new CustomError("InvalidToken",'Token invalid')
        }

        const user = await User.findById(decodedToken.id);
        if (!user) {
            throw new CustomError("UserNotFound",'user not found')
        }
        request.user = user;
    } else {
        throw new CustomError("TokenNotFound", "missing auth token required")
    }

    next();
};

export const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (err, request, response, next) => {
    error(err.name)
    error(err.message)

    if (err.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return response.status(400).json({ error: err.message })
    } else if (err.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: err.message })
    } else if (err.name === 'ProvidedIncorrectDetails') {
        return response.status(401).json({ error: err.message })
    } else if (err.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    } else if (err.name === 'PasswordRestrictions') {
        return response.status(401).json({
            error: err.message
        })
    } else if (err.name === 'InvalidToken') {
        return response.status(401).json({
            error: err.message
        })
    } else if (err.name === 'UserNotFound') {
        return response.status(401).json({
            error: err.message
        })
    } else if (err.name === 'TokenNotFound') {
        return response.status(401).json({
            error: err.message
        })
    }
    else if (err.name === 'DeletionRefused') {
        return response.status(401).json({
            error: err.message
        })
    }
    else if (err.name === 'BlogForDeletionNotFound') {
        return response.status(401).json({
            error: err.message
        })
    }

    next(err)
}