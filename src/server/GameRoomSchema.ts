import { Schema, type } from '@colyseus/schema'

export default class GameRoomSchema extends Schema {
    @type('uint64')
    public tick: number = 0

    @type('float64')
    public ts: number = 0
}
