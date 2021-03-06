import express, { Request } from 'express'
import { log } from './util/Logger'
import expressWinston from 'express-winston'
import { connect, disconnect } from './database'
import Users from './database/models/user.model'
import { userRouter } from './routes/user'
import { alexaRouter } from './routes/alexa'

process.on('SIGINT', () => {
    process.exit(130)
})

const app = express()

app.use(express.json())

app.use(expressWinston.logger({
    winstonInstance: log,
    level: 'info',
}))

app.get('/', (_req, res) => {
    res.send('Hello, World! Server is running!')
})

type TestParams = {
    id: string,
}

type TestReq = {
    user: {
        name: string,
        email: string,
        age: number,
    },
}

type TestRes = {
    message: string,
}

app.post('/test', (req: Request<TestParams, TestRes, TestReq>, res) => {
    const user = req.body.user
    res.send({ message: `Hi ${user.name}, your email is ${user.email} and your age ${user.age}!` })
})

app.get('/env', (req, res) => {
    res.send({ TEST: `${process.env.TEST}` })
})

app.use('/user', userRouter)
app.use('/alexa', alexaRouter)

connect().then(() => {
    app.listen(9000, '0.0.0.0')
})

process.on('SIGINT', async () => {
    await disconnect()
    process.exit(130)
})