import bcrypt from 'bcrypt'
import {User} from "../../models/users.js";
import {CustomError} from "../../utils/CustomError.js";

export const getAllUsers = async () => {
    return User.find({}).populate("blogs", {title: 1})
}
export const createUser = async ({ username, name, password }) => {

    if (password.length < 3) {
        throw new CustomError("PasswordRestrictions", "password length must contain at least three characters")
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    return await user.save()
}