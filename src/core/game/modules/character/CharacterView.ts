import { View } from '../../world/view/View'
import { LogicModelCharacterState } from '../../world/Logic/LogicModel'
import { Scene } from '@babylonjs/core/scene'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

const VECTOR3_BUFFER = new Vector3()

export class CharacterView implements View<LogicModelCharacterState>{
    private readonly mesh: Mesh

    constructor(private readonly _scene: Scene, state: LogicModelCharacterState) {
        this.mesh = MeshBuilder.CreateBox(`character_${state.playerId}`, { size: 1 })
    }

    public create(state: LogicModelCharacterState): void {
        this.mesh.position.set(state.position.x, state.position.y, state.position.z)
    }

    public dispose(): void {
        this.mesh.dispose()
    }

    public update(dt: number, state: LogicModelCharacterState): void {
        // this.mesh.position.set(state.position.x, state.position.y, state.position.z)
        VECTOR3_BUFFER.set(state.position.x, state.position.y, state.position.z)
        Vector3.LerpToRef(this.mesh.position, VECTOR3_BUFFER, dt * 0.001 *  5, this.mesh.position)
    }
}
