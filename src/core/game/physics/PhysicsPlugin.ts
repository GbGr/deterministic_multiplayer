import { FactoryFunction, InjectionToken, instancePerContainerCachingFactory } from 'tsyringe'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
import * as CANNON from 'cannon-es'

// @ts-ignore
CANNON.World.prototype.add = CANNON.World.prototype.addBody

export const PHYSICS_PLUGIN: InjectionToken<CannonJSPlugin> = Symbol.for('PHYSICS_PLUGIN')

export const PhysicsPluginFactory: FactoryFunction<CannonJSPlugin> = instancePerContainerCachingFactory((dependencyContainer) => {
    return new CannonJSPlugin(false, 1, CANNON)
})
