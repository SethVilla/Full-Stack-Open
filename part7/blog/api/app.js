import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import {DatabaseConnection} from "./services/database/db.js";
import mongoose from 'mongoose'
import {requestLogger, errorHandler, unknownEndpoint, extractAndVerifyToken} from "./utils/middleware.js";
import {blogsRouter} from "./controllers/blog/blog.js";
import {usersRouter} from "./controllers/user/users.js";
import {authRouter} from "./controllers/auth/auth.js";

mongoose.set('strictQuery', false)


export const app = express()

await DatabaseConnection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('dist'))
app.use(requestLogger)

app.use('/api/auth', authRouter)
app.use('/api/user', usersRouter)
app.use('/api/blog', extractAndVerifyToken, blogsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)