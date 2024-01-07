import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

const argLength = process.argv.length

if (argLength < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

console.log(process.argv)

const url = process.env.MONGO_DB_URI

mongoose.set('strictQuery',false)
mongoose.connect(`mongodb+srv://seth:${password}@full-stack-open.kjnnsbd.mongodb.net/phonebook?retryWrites=true`)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Entry = mongoose.model('Person', entrySchema)

if (argLength === 3) {
  Entry.find({}).then(result => {
    console.log('PhoneBook: ')
    result.forEach(entry => {
      console.log(entry)
    })
    mongoose.connection.close()
  })
} else if (argLength === 5) {
  const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4],
  })

  entry.save().then(result => {
    console.log('entry saved!')
    mongoose.connection.close()
  })
}