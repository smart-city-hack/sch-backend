import { Request, Router } from 'express'
import Users from '../database/models/user.model'
import { getNextTrafficLight } from '../openStreetMapAPI/next_trafficlight'

export const alexaRouter = Router()

alexaRouter.get('/help', (req, res) => {
    res.send("You f'ucking Cu'nt. Go f'uck yourself you stupid piece of sh'it.")
})

alexaRouter.get('/state', async (req: Request<{}, any, {}, { id: string }>, res) => {
    let { id } = req.query
    if (!id)
        id = 'default'

    const user = await Users.getUserOrCreate(id)
    if (!user.traffic_light.visible) {
        res.send("I don't see a f'ucking traffic light.")
        return
    }
    if (user.traffic_light.multiple) {
        res.send("I see multiple f'ucking traffic lights.")
        return
    }
    if (user.traffic_light.non_pedestrian) {
        res.send("I don't see a stupid ass pedestrian traffic light.")
        return
    }
    if (user.traffic_light.red === undefined) {
        res.send("I can't f'ucking see the stupid color of this mother f'ucking traffic light.")
        return
    }
    if (user.traffic_light.red === true) {
        res.send("The light is red, stay the fu'ck put and do not cross the street.")
        return
    }
    if (user.traffic_light.red === false) {
        res.send("The light is green, take a f'ucking walk.")
        return
    }
})

alexaRouter.get('/nearby', async (req: Request<any, any, any, { id: string }>, res) => {
    let { id } = req.query
    if (!id)
        id = 'default'

    const user = await Users.getUserOrCreate(id)

    let distance = await getNextTrafficLight(`${user.position.latitude} ${user.position.longitude}`)
        .catch(e => undefined)

    if (distance == undefined) {
        res.send(`No nearby traffic lights found.`)
        return
    }

    res.send(`Walk ${Math.round(distance * 1000)}m down the road.`)
})

alexaRouter.post('/storeuser', async (req, res) => {
    const user = await Users.getUserOrCreate('alexa')
    user.position = { latitude: JSON.stringify(req.body), longitude: "" }
    await user.save()
    res.send('done')
})