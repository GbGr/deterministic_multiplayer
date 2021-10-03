import { FactoryFunction, InjectionToken, instancePerContainerCachingFactory } from 'tsyringe'
import { INetworkTransport } from './INetworkTransport'
import { Platform, PLATFORM_ID } from '../../../../di/Platform'

export const NETWORK_TRANSPORT: InjectionToken<INetworkTransport> = Symbol.for('NETWORK_TRANSPORT')

export const NetworkTransportFactory: FactoryFunction<INetworkTransport> = instancePerContainerCachingFactory((dependencyContainer) => {
    const platform = dependencyContainer.resolve(PLATFORM_ID)

    return platform === Platform.BROWSER
        ? dependencyContainer.resolve(require('./NetworkTransport').default)
        : dependencyContainer.resolve(require('./NullNetworkTransport').default)
})
