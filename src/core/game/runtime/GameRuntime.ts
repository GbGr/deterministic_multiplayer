import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import MainCamera from '../cameras/MainCamera'
import World from '../world/World'
import Network from '../world/Network/Network'
import TypedEvent from '../../misc/TypedEvent'
import { LogicModelState } from '../world/Logic/LogicModel'

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
        const dirLight = new DirectionalLight('dirLight', new Vector3(0, -1, 0.75), this._scene)
        dirLight.position.set(0, 50, -50)
        this.createGround()
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

    private createGround(): void {
        const groundMaterial = new StandardMaterial('ground', this._scene)
        groundMaterial.diffuseColor = Color3.FromHexString('#00306d')
        groundMaterial.specularColor = Color3.Black()
        const groundMesh = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, this._scene)
        groundMesh.material = groundMaterial
        groundMesh.physicsImpostor = new PhysicsImpostor(groundMesh, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 })
    }
}
