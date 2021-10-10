import { inject, Lifecycle, scoped } from 'tsyringe'
import { World } from 'cannon-es'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
import { PHYSICS_PLUGIN } from './PhysicsPlugin'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { PhysicsImpostor, PhysicsImpostorParameters } from '@babylonjs/core/Physics/physicsImpostor'

@scoped(Lifecycle.ContainerScoped)
export default class PhysicsEngine {
    public readonly world: World
    private readonly physicsObjects: Map<number, Mesh> = new Map<number, Mesh>()

    constructor(
        @inject(PHYSICS_PLUGIN) private readonly _physicsPlugin: CannonJSPlugin) {
        this.world = _physicsPlugin.world
    }

    public step(dt: number): void {
        this.world.step(dt, undefined, 0)
    }

    public getObject(id: number): Mesh | void {
        return this.physicsObjects.get(id)
    }

    public createObject(id: number, mesh: Mesh, impostorType: number, params: PhysicsImpostorParameters): Mesh {
        params.disableBidirectionalTransformation = true
        mesh.physicsImpostor = new PhysicsImpostor(mesh, impostorType, params)
        this.physicsObjects.set(id, mesh)

        return mesh
    }

    public deleteObject(mesh: Mesh): void {
        mesh.physicsImpostor.dispose()
        mesh.physicsImpostor = null
    }
}
