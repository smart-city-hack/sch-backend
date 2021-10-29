import { prop } from "@typegoose/typegoose";

export class Coordinates {
    @prop()
    latitude!: string

    @prop()
    longitude!: string
}