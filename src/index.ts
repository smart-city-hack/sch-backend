import express from 'express'
import { log } from './util/Logger'
import expressWinston from 'express-winston'

const app = express()

app.use(expressWinston.logger({
    winstonInstance: log,
    level: 'info',
}))

app.get('/', (_req, res) => {
    res.send('Hello, World! Server is running!')
})

app.listen(9000, '0.0.0.0')