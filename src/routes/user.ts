import { Request, Router } from 'express'
import Users from '../database/models/user.model'

export const userRouter = Router()

type StateReq = {
    traffic_light: {
        visible: boolean,
        multiple: boolean,
        non_pedestrian: boolean,
        red: boolean,
    },
    position: {
        latitude: string,
        longitude: string,
    },
}

type StateRes = {
    success: boolean,
    message?: string,
}

userRouter.post('/state', async (req: Request<unknown, StateRes, StateReq, { id?: string }>, res) => {
    let { id } = req.query
    const body = req.body
    if (!id) id = 'default'
    const user = await Users.getUserOrCreate(id)
    if (body.position) user.position = body.position
    if (body.traffic_light) user.traffic_light = body.traffic_light
    user.save()
    res.send({ success: true, message: `Traffic light: ${JSON.stringify(user.traffic_light)}` })
})