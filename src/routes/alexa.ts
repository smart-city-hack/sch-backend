import { Request, Router } from "express"
import Users from "../database/models/user.model"

export const alexaRouter = Router()

alexaRouter.get('/help', (req, res) => {
    res.send("I don't have fucking eyes, go help yourself you fucking idiot.")
})

alexaRouter.get('/state', async (req: Request<{}, any, {}, { id: string }>, res) => {
    let { id } = req.query
    if (!id)
        id = 'default'

    const user = await Users.getUserOrCreate(id)
    if (!user.traffic_light.visible) {
        res.send({
            success: false,
            message: "I don't see a traffic light."
        })
        return
    }
    if (user.traffic_light.multiple) {
        res.send('I see multiple traffic lights.')
        return
    }
    if (user.traffic_light.non_pedestrian) {
        res.send("I don't see a pedestrian traffic light.")
        return
    }
    if (user.traffic_light.red === undefined) {
        res.send("I can't make out the color of the traffic light.")
        return
    }
    if (user.traffic_light.red === true) {
        res.send('The light is red, stay put and do not cross the street.')
        return
    }
    if (user.traffic_light.red === false) {
        res.send('The light is green, you can pass the crossing,')
        return
    }
})