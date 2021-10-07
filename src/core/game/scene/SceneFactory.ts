import '@babylonjs/core/Materials/standardMaterial'
import '@babylonjs/core/Physics/physicsEngineComponent'
import { FactoryFunction, instancePerContainerCachingFactory } from 'tsyringe'
import { Scene } from '@babylonjs/core/scene'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { PHYSICS_PLUGIN } from '../physics/PhysicsPlugin'

const SceneFactory: FactoryFunction<Scene> = instancePerContainerCachingFactory((dependencyContainer) => {
    const scene = new Scene(dependencyContainer.resolve(Engine))
    const physicsPlugin = dependencyContainer.resolve(PHYSICS_PLUGIN)
    scene.enablePhysics(new Vector3(0, -9.8, 0), physicsPlugin)

    return scene
})

export default SceneFactory
