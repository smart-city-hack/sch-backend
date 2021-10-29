import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { log } from '../../util/Logger'
import { Coordinates } from './common'

@modelOptions({
    schemaOptions: {
        id: false,
        toJSON: {
            virtuals: true,
        },
    },
})
export class User {
    @prop({ type: String })
    _id!: string

    @prop({ type: Coordinates })
    position!: Coordinates

    static async getUserOrCreate(id: string): Promise<DocumentType<User>> {
        const doc = await Users.findById(id)
        return doc || await (async () => {
            log.info(`Created user with id ${id}`)
            const user = new Users({
                _id: id,
                position: { latitude: '123', longitude: '420' }
            })
            await user.save()
            return user
        })()

    }
}

const Users = getModelForClass(User)
export default Users
