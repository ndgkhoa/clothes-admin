import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is already connected')
        return
    }

    const mongoUrl = process.env.MONGODB_URL

    if (!mongoUrl) {
        throw new Error('MONGODB_URL is not defined in environment variables')
    }

    try {
        await mongoose.connect(mongoUrl)
        isConnected = true
        console.log('MongoDB is connected')
    } catch (error) {
        console.log(error)
    }
}
