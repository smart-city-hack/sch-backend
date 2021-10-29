import { AssertionError } from 'chai'
import Mongoose, { Connection } from 'mongoose'
import { log } from '../util/Logger'
import urljoin from 'url-join'

let connection: Connection

export async function connect(): Promise<void> {
    if (connection)
        return

    let uri = process.env.MONGO_URI
    if (!uri)
        throw new AssertionError('Environment variable "MONGO_URI" is required, but was not found.')

    uri = urljoin(uri, 'main')

    log.info({ mongo_uri: uri })

    await Mongoose.connect(uri, {
        autoIndex: true,
    })

    connection = Mongoose.connection

    connection.once('open', async () => {
        log.info('MongoDB connected')
    })

    connection.on('error', () => {
        log.error('Error connecting to database')
    })
}