import express from 'express'
import { logger } from './util/Logger'
import expressPinoLogger from 'express-pino-logger'

const app = express()

app.use(expressPinoLogger({ logger }))

logger.trace('trace')
logger.debug('debug')
logger.warn('warn')

app.get('/', (_req, res) => {
    res.send('Hello, World! Server is running!')
})

app.listen(9000, '0.0.0.0')