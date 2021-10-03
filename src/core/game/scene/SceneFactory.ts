import { FactoryFunction, instancePerContainerCachingFactory } from 'tsyringe'
import { Scene } from '@babylonjs/core/scene'
import { Engine } from '@babylonjs/core/Engines/engine'

const SceneFactory: FactoryFunction<Scene> = instancePerContainerCachingFactory((dependencyContainer) => {
    const scene = new Scene(dependencyContainer.resolve(Engine))
    return scene
})

export default SceneFactory
