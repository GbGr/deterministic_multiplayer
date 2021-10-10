import * as http from 'http'
import { Client, Room } from '@colyseus/core'
import { ServerCommands } from '../core/misc/ServerCommands'
import NetworkPackage from '../core/game/world/Network/NetworkPackage'
import GameRoomSchema from './GameRoomSchema'
import startupGameCore from '../core'
import { Platform } from '../core/di/Platform'
import GameRuntime from '../core/game/runtime/GameRuntime'
import { LogicModelState } from '../core/game/world/Logic/LogicModel'

export default class GameRoom extends Room<GameRoomSchema> {
    private _gameRuntime: GameRuntime

    public onCreate(): void {
        this.clock.start()
        this.setPatchRate(0)

        this._gameRuntime = startupGameCore(Platform.SERVER)
        this._gameRuntime.onAfterLogicUpdate.on(this.afterLogicUpdateHandler)
        this._gameRuntime.runRenderLoop()

        this.setState(new GameRoomSchema())

        this.onMessage<NetworkPackage>(ServerCommands.ProvideRPC, (client: Client, rpc) => {
            this._gameRuntime.network.receiveRPCHandler(rpc)
            this.broadcast(ServerCommands.ProvideRPC, rpc, { except: client })
        })
    }

    public afterLogicUpdateHandler = (state: LogicModelState): void => {
        this.state.ts = this._gameRuntime.world.timeSinceStart
        this.state.tick = state.tick

        if (this.state.tick !== state.tick) this.broadcastPatch()
    }


    public onAuth(client: Client, options: any, request: http.IncomingMessage): boolean {
        return true
    }


    public onJoin(client: Client, options: any, auth: any): void {
        this.broadcastPatch()
        const { tick, characters, physicsObjects } = this._gameRuntime.world.logicModelState
        const serializedState = {
            tick,
            characters: Object.fromEntries(characters),
            physicsObjects: Object.fromEntries(physicsObjects),
        }
        client.send(ServerCommands.SyncState, {
            ts: this.state.ts,
            tick: this.state.tick,
            state: serializedState,
        } as any)
    }

    // When a client leaves the room
    onLeave (client: Client, consented: boolean) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}
