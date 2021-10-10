import { FactoryFunction, InjectionToken, instancePerContainerCachingFactory } from 'tsyringe'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
import * as CANNON from 'cannon-es'
import { LOGIC_DT } from '../world/constants'

// @ts-ignore
CANNON.World.prototype.add = CANNON.World.prototype.addBody

export const PHYSICS_PLUGIN: InjectionToken<CannonJSPlugin> = Symbol.for('PHYSICS_PLUGIN')

export const PhysicsPluginFactory: FactoryFunction<CannonJSPlugin> = instancePerContainerCachingFactory((dependencyContainer) => {
    const physicsPlugin = new CannonJSPlugin(false, 1, CANNON)
    physicsPlugin.setTimeStep(LOGIC_DT)

    return physicsPlugin
})
