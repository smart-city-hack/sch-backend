import { prop, modelOptions } from "@typegoose/typegoose"

@modelOptions({
    schemaOptions: {
        _id: false,
        id: false,
        toJSON: {
            virtuals: true,
        },
    },
})
export class Coordinates {
    @prop({ type: String })
    latitude!: string

    @prop({ type: String })
    longitude!: string
}
