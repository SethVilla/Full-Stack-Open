import mongoose from 'mongoose'
import {MONGODB_URI} from "../../utils/config.js";

export const DatabaseConnection = async () => {
  try {
   // const connection =
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')
    // connection not needed with mongoose
    // return connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}
