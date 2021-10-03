import NetworkPackage, { SyncStateNetworkPackage } from '../NetworkPackage'
import TypedEvent from '../../../../misc/TypedEvent'

export interface INetworkTransport {
    isInitialized: boolean
    onReceiveRPC: TypedEvent<NetworkPackage>
    initialize(): Promise<SyncStateNetworkPackage>
    broadcastRPC(rpc: NetworkPackage): void
}
