import { Scene } from '@babylonjs/core/scene'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

export default class Character {
    public static HEIGHT: number = 2
    public static RADIUS: number = 0.7

    private readonly scene: Scene
    private readonly material: StandardMaterial

    public readonly mesh: Mesh

    constructor(scene: Scene, mesh: Mesh, state: { position: Vector3 }) {
        this.scene = scene
        this.mesh = mesh
        this.material = this.createMaterial()
        this.mesh.material = this.material
        this.mesh.visibility = 1
        this.mesh.position.copyFrom(state.position)
        this.mesh.position.y = Character.HEIGHT / 2
    }

    public update(state: { position: Vector3 }): void {
        this.mesh.position.copyFrom(state.position)
        this.mesh.position.y = Character.HEIGHT / 2
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial(`${this.mesh.name}`, this.scene)
        material.diffuseColor = Color3.FromHexString('#FF0000')

        return material
    }
}
