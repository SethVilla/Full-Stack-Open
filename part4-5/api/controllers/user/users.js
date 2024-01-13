import express from "express"
export const usersRouter = express.Router()
import {getAllUsers} from "../../services/user/user.js";

usersRouter.get('/', async (request, response) => {
    response.json(await getAllUsers())
})
