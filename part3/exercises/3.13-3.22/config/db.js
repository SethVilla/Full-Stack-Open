import mongoose from 'mongoose'
export const DatabaseConnection = async () => {
  try {
    const url = process.env.MONGO_DB_URI
    const connection = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')
    // connection not needed with mongoose
    return connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}
