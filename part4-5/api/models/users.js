import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, minlength: 3},
    name: {type: String, required: true},
    passwordHash: {type: String, required: true},
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

export const User = mongoose.model('User', userSchema)