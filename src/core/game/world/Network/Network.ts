import { inject, Lifecycle, scoped } from 'tsyringe'
import World from '../World'
import { InputAction } from '../Input/InputAction'
import NetworkPackageFactory from './NetworkPackageFactory'
import RPCQueue from './RPCQueue'
import NetworkPackage from './NetworkPackage'
import { INetworkTransport } from './transport/INetworkTransport'
import { NETWORK_TRANSPORT } from './transport/NetworkTransportFactory'

@scoped(Lifecycle.ContainerScoped)
export default class Network {
    private readonly _playerId: number = parseInt(Math.random().toString().slice(2, 7), 10)

    constructor(
        private readonly _world: World,
        private readonly _rpcQueue: RPCQueue,
        @inject(NETWORK_TRANSPORT) private readonly _transport: INetworkTransport,
    ) {
        this._transport.onReceiveRPC.on(this.receiveRPCHandler)
    }

    public addRPC(inputAction: InputAction): void {
        const networkPackage = NetworkPackageFactory.create(this._world.tickSinceStart + 1, this._playerId, inputAction)
        this._rpcQueue.enqueueNetworkPackage(networkPackage)
        this._transport.broadcastRPC(networkPackage)
    }

    public receiveRPCHandler = (rpc: NetworkPackage): void => {
        this._rpcQueue.enqueueNetworkPackage(rpc)
    }
}
