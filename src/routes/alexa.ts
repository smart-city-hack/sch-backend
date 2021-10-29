import { Router } from "express"

export const alexaRouter = Router()

alexaRouter.get('/help', (req, res) => {
    res.send("I don't have fucking eyes, go help yourself you fucking idiot.")
})
