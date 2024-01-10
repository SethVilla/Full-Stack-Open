import {User} from "../../models/users.js";

export const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}