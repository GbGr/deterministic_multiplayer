import { FactoryFunction, instancePerContainerCachingFactory } from 'tsyringe'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Platform, PLATFORM_ID } from '../../di/Platform'
import { NullEngine } from '@babylonjs/core'
import { CANVAS_ELEMENT } from '../../di/CanvasElement'

const lockstepMaxSteps = 0
const deterministicLockstep = false
const useHighPrecisionMatrix = false

const EngineFactory: FactoryFunction<Engine> = instancePerContainerCachingFactory<Engine>((dependencyContainer) => {
    const platform = dependencyContainer.resolve(PLATFORM_ID)

    return (platform === Platform.SERVER)
        ? new NullEngine({
            renderWidth: 256,
            renderHeight: 256,
            textureSize: 256,
            lockstepMaxSteps,
            deterministicLockstep,
            useHighPrecisionMatrix,
        }) as unknown as Engine
        : new Engine(dependencyContainer.resolve(CANVAS_ELEMENT), true, {
            lockstepMaxSteps,
            deterministicLockstep,
            useHighPrecisionMatrix,
        }, true)
})

export default EngineFactory
