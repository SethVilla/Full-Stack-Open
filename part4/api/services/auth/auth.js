import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {User} from "../../models/users.js";
import {CustomError} from "../../utils/CustomError.js";

export const login = async ({ username, password }) => {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        throw new CustomError("ProvidedIncorrectDetails",'invalid username or password')
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    return  {
        username: user.username,
        name: user.name,
        id: user._id,
        token: jwt.sign(
            userForToken,
            process.env.SECRET,
            { expiresIn: 60*60 }
        )
    }
}