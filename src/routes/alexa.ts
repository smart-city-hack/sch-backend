import { Request, Router } from 'express'
import Users from '../database/models/user.model'
import { getNextTrafficLight } from '../openStreetMapAPI/next_trafficlight'

export const alexaRouter = Router()

alexaRouter.get('/help', (_req, res) => {
    res.send('Say "Help me" to request help.')
})

alexaRouter.get('/state', async (req: Request<unknown, string, unknown, { id: string }>, res) => {
    let { id } = req.query
    if (!id)
        id = 'default'

    const user = await Users.getUserOrCreate(id)
    if (!user.traffic_light.visible) {
        res.send("I don't see a traffic light right now.")
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
        res.send("I can't make out the color of this traffic light.")
        return
    }
    if (user.traffic_light.red === true) {
        res.send("The light is red, stay put and don't cross the street.")
        return
    }
    if (user.traffic_light.red === false) {
        res.send('The light is green, you can go across the road.')
        return
    }
})

alexaRouter.get('/nearby', async (req: Request<unknown, string, unknown, { id: string }>, res) => {
    let { id } = req.query
    if (!id)
        id = 'default'

    const user = await Users.getUserOrCreate(id)

    const distance = await getNextTrafficLight(`${user.position.latitude} ${user.position.longitude}`)
        .catch(() => undefined)

    if (distance == undefined) {
        res.send('No nearby traffic lights found.')
        return
    }

    res.send(`Walk ${Math.round(distance * 1000)}m down the road.`)
})

alexaRouter.post('/storeuser', async (req, res) => {
    const user = await Users.getUserOrCreate('alexa')
    user.position = { latitude: JSON.stringify(req.body), longitude: '' }
    await user.save()
    res.send('done')
})