import { Lifecycle, scoped } from 'tsyringe'
import { Client, Room } from 'colyseus.js'
import NetworkPackage, { SyncStateNetworkPackage } from '../NetworkPackage'
import { ServerCommands } from '../../../../misc/ServerCommands'
import TypedEvent from '../../../../misc/TypedEvent'
import GameRoomSchema from '../../../../../server/GameRoomSchema'
import { INetworkTransport } from './INetworkTransport'

@scoped(Lifecycle.ContainerScoped)
export default class NetworkTransport implements INetworkTransport {
    private readonly _client: Client
    private _room: Room<GameRoomSchema>
    private _isInitialized: boolean = false

    public readonly onReceiveRPC: TypedEvent<NetworkPackage>

    get isInitialized(): boolean {
        return this._isInitialized
    }

    constructor() {
        this._client = new Client('ws://localhost:7777')
        this.onReceiveRPC = new TypedEvent<NetworkPackage>()
    }

    public async initialize(): Promise<SyncStateNetworkPackage> {
        this._room = await this._client.joinOrCreate('GameRoom', {}, GameRoomSchema)

        this._room.onMessage<NetworkPackage>(ServerCommands.ProvideRPC, (rpc) => {
            this.onReceiveRPC.emit(rpc)
        })

        return new Promise((resolve) => {
            this._room.onMessage<SyncStateNetworkPackage>(ServerCommands.SyncState, (syncStateNetworkPackage) => {
                this._isInitialized = true
                resolve(syncStateNetworkPackage)
            })
        })
    }

    public broadcastRPC(rpc: NetworkPackage): void {
        this._room.send(ServerCommands.ProvideRPC, rpc)
    }
}
