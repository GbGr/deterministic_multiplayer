import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import MainCamera from '../cameras/MainCamera'
import World from '../world/World'
import Network from '../world/Network/Network'
import TypedEvent from '../../misc/TypedEvent'
import { LogicModelState } from '../world/Logic/LogicModel'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'

export default class GameRuntime {
    public readonly onAfterLogicUpdate: TypedEvent<LogicModelState>

    constructor(
        protected readonly _engine: Engine,
        protected readonly _scene: Scene,
        protected readonly _camera: MainCamera,
        public readonly world: World,
        public readonly network: Network,
    ) {
        this.onAfterLogicUpdate = new TypedEvent<LogicModelState>()
        const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, this._scene)
        sphere.position.set(0, 30, 0)
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 2 }, this._scene)
    }

    public update(dt: number): void {
        this.world.update(dt)
        this.onAfterLogicUpdate.emit(this.world.logicModelState)
        this._scene.render()
    }

    public runRenderLoop(): void {
        throw new Error('not implemented')
    }

    public stopRenderLoop(): void {
        throw new Error('not implemented')
    }

}
