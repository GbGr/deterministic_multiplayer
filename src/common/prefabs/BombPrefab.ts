import { IPrefab } from './IPrefab'
import { Scene } from '@babylonjs/core/scene'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import Bomb from '../components/Bomb/Bomb'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'

export default class BombPrefab implements IPrefab<Bomb> {
    private readonly scene: Scene
    private readonly mesh: Mesh
    private instancesCount: number = 0

    constructor(scene: Scene) {
        this.scene = scene
        this.mesh = MeshBuilder.CreateSphere('bomb', { diameter: Bomb.DIAMETER })
        this.mesh.visibility = 0
    }

    public instantiate(): Bomb {
        const mesh = this.mesh.clone(`${this.mesh.name}_${++this.instancesCount}`)
        mesh.visibility = 1
        mesh.convertToUnIndexedMesh()

        return new Bomb(this.scene, mesh);
    }

}
