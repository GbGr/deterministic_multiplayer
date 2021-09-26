import { Scene } from '@babylonjs/core/scene'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import BombPrefab from '../../prefabs/BombPrefab'
import Bomb from '../Bomb/Bomb'

export default class Character {
    public static HEIGHT: number = 2
    public static RADIUS: number = 0.7

    private readonly scene: Scene
    private readonly material: StandardMaterial
    private readonly bombPrefab: BombPrefab

    public readonly mesh: Mesh

    constructor(scene: Scene, mesh: Mesh, bombPrefab: BombPrefab) {
        this.scene = scene
        this.mesh = mesh
        this.bombPrefab = bombPrefab
        this.material = this.createMaterial()
        this.mesh.material = this.material
        this.mesh.visibility = 1
        this.mesh.position.y = Character.HEIGHT / 2
    }

    public dropBomb(): void {
        const newBomb = this.bombPrefab.instantiate()
        newBomb.mesh.position.copyFrom(this.mesh.position)
        newBomb.mesh.position.y = Bomb.DIAMETER / 2
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial(`${this.mesh.name}`, this.scene)
        material.diffuseColor = Color3.FromHexString('#FF0000')

        return material
    }
}
