import { FactoryFunction, instancePerContainerCachingFactory } from 'tsyringe'
import { Platform, PLATFORM_ID } from '../../di/Platform'
import GameRuntime from './GameRuntime'

const GameRuntimeFactory: FactoryFunction<GameRuntime> = instancePerContainerCachingFactory((dependencyContainer) => {
    const platform = dependencyContainer.resolve(PLATFORM_ID)

    return (platform === Platform.BROWSER)
        ? dependencyContainer.resolve(require('./BrowserRuntime').default)
        : dependencyContainer.resolve(require('./ServerRuntime').default)
})

export default GameRuntimeFactory
