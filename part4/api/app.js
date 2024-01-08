import express from 'express'
import cors from 'cors'
import {DatabaseConnection} from "./services/database/db.js";
import mongoose from 'mongoose'
import {requestLogger, errorHandler, unknownEndpoint} from "./utils/middleware.js";
import {blogsRouter} from "./controllers/blog/blog.js";

mongoose.set('strictQuery', false)


export const app = express()

DatabaseConnection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('dist'))
app.use(requestLogger)

app.use('/api/blog', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)