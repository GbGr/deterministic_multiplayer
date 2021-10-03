import { INetworkTransport } from './INetworkTransport'
import TypedEvent from '../../../../misc/TypedEvent'
import NetworkPackage, { SyncStateNetworkPackage } from '../NetworkPackage'
import { Lifecycle, scoped } from 'tsyringe'

@scoped(Lifecycle.ContainerScoped)
export default class NullNetworkTransport implements INetworkTransport {
    public isInitialized = true
    public onReceiveRPC = new TypedEvent<NetworkPackage>()

    public broadcastRPC(rpc: NetworkPackage): void {
    }

    public initialize(): Promise<SyncStateNetworkPackage> {
        console.log('NullNetworkTransport')
        return Promise.resolve({ ts: 0, tick: 0, state: null })
    }

}
