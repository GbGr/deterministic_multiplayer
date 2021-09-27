import { IPrefab } from './IPrefab'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { Scene } from '@babylonjs/core/scene'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import Character from '../components/Character/Character'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

export default class CharacterPrefab implements IPrefab<Character, { position: Vector3 }> {
    private readonly scene: Scene
    private instancesCount: number = 0

    public readonly mesh: Mesh

    constructor(scene: Scene) {
        this.scene = scene
        this.mesh = MeshBuilder.CreateCapsule('character', { height: Character.HEIGHT, radius: Character.RADIUS, capSubdivisions: 4, subdivisions: 4
            , tessellation: 8 }, this.scene)
        this.mesh.visibility = 0
    }

    public instantiate(state: { position: Vector3 }): Character {
        const mesh = this.mesh.clone(`${this.mesh.name}_${++this.instancesCount}`, null)
        mesh.convertToUnIndexedMesh()

        return new Character(this.scene, mesh, state)
    }
}
