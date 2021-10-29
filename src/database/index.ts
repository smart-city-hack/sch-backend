import { AssertionError } from 'chai'
import Mongoose, { Connection } from 'mongoose'
import { log } from '../util/Logger'

export async function connect(): Promise<void> {
    if (Mongoose.connection)
        return

    const uri = process.env.MONGO_URI
    if (!uri)
        throw new AssertionError('Environment variable "MONGO_URI" is required, but was not found.')

    log.info({ mongo_uri: uri })

    await Mongoose.connect(uri, {
        autoIndex: true,
    })

    const connection: Connection = Mongoose.connection

    connection.once('open', async () => {
        log.info('MongoDB connected')
    })

    connection.on('error', () => {
        log.error('Error connecting to database')
    })

}