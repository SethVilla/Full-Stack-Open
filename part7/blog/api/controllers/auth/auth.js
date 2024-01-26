import express from "express";
import {login} from "../../services/auth/auth.js";
import {createUser} from "../../services/user/user.js";
export const authRouter = express.Router()

authRouter.post("/login", async (req, res) => {
    res.status(200).send(await login(req.body))
})

authRouter.post('/register', async (request, response) => {
    response.status(201).json(await createUser(request.body))
})