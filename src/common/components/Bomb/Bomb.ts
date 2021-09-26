import { Scene } from '@babylonjs/core/scene'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Color3 } from '@babylonjs/core/Maths/math.color'

export default class Bomb {
    static DIAMETER: number = 1

    private readonly scene: Scene
    private readonly material: StandardMaterial

    public readonly mesh: Mesh

    constructor(scene: Scene, mesh: Mesh) {
        this.scene = scene
        this.mesh = mesh
        this.material = this.createMaterial()
        this.mesh.material = this.material
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial(`${this.mesh.name}`, this.scene)
        material.diffuseColor = Color3.Black()

        return material
    }
}
