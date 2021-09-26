import { Scene } from '@babylonjs/core/scene'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'

export default class Ground {
    public readonly mesh: Mesh
    public readonly material: StandardMaterial

    constructor(private readonly scene: Scene) {
        this.mesh = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, this.scene)
        this.material = new StandardMaterial('ground', this.scene)
        this.material.diffuseColor = Color3.FromHexString('#61C100')
        this.material.specularColor = Color3.Black()
        this.mesh.material = this.material
    }
}
