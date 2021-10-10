import type { Body } from 'cannon-es'
import { ILogicProcessor } from '../ILogicProcessor'
import NetworkPackage from '../../Network/NetworkPackage'
import LogicModel from '../LogicModel'
import PhysicsEngine from '../../../physics/PhysicsEngine'
import { copyFromVector3Like, copyFromVector4Like } from '../../../../misc/copy'
import { InputActionType } from '../../Input/InputAction'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'
import { Lifecycle, scoped } from 'tsyringe'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { MOVE_BACKWARD, MOVE_FORWARD } from '../../../modules/character/Move'

@scoped(Lifecycle.ContainerScoped)
export default class PhysicsObjectLogicProcessor implements ILogicProcessor {
    constructor(
        private readonly _logicModel: LogicModel,
        private readonly _physicsEngine: PhysicsEngine) {
    }

    public copyPhysicsWorldFromState(): void {
        this._logicModel.state.physicsObjects.forEach((objectState, id) => {
            const mesh = this._physicsEngine.getObject(id)
            if (!mesh) throw new Error('Mesh not found') // double check
            const body: Body = mesh.physicsImpostor.physicsBody
            objectState.objectId = body.id
            copyFromVector3Like(objectState.force, body.force)
            copyFromVector3Like(objectState.linearVelocity, body.velocity)
            copyFromVector3Like(objectState.angularVelocity, body.angularVelocity)
            copyFromVector3Like(objectState.position, body.position)
            copyFromVector4Like(objectState.quaternion, body.quaternion)
            // console.log(`copyPhysicsWorldFromState ${this._logicModel.state.physicsObjects.size}`)
        })
    }

    public copyStateFromPhysicsWorld(): void {
        this._logicModel.state.physicsObjects.forEach((objectState, id) => {
            const mesh = this._physicsEngine.getObject(id)
            if (!mesh) throw new Error('Mesh not found') // double check
            const body: Body = mesh.physicsImpostor.physicsBody
            objectState.objectId = body.id
            copyFromVector3Like(body.force, objectState.force)
            copyFromVector3Like(body.velocity, objectState.linearVelocity)
            copyFromVector3Like(body.angularVelocity, objectState.angularVelocity)
            copyFromVector3Like(body.position, objectState.position)
            copyFromVector4Like(body.quaternion, objectState.quaternion)
            // console.log(`copyStateFromPhysicsWorld`)
        })
    }

    public process(dt: number, networkPackages: Array<NetworkPackage>): void {
        // Manipulate here
        networkPackages.forEach((rpc) => {
            if (rpc.type !== InputActionType.CharacterMove) return
            let physicsObject = this._physicsEngine.getObject(rpc.playerId)
            if (!physicsObject) {
                physicsObject = MeshBuilder.CreateIcoSphere(`sphere_${rpc.playerId}`, { radius: 2 })
                physicsObject.position.set(0, 6, 0)
                this._physicsEngine.createObject(rpc.playerId, physicsObject, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 })
            }
            if (!this._logicModel.state.physicsObjects.has(rpc.playerId)) {
                this._logicModel.state.physicsObjects.set(rpc.playerId, {
                    objectId: rpc.playerId,
                    force: { x: 0, y: 0, z: 0 },
                    linearVelocity: { x: 0, y: 0, z: 0 },
                    angularVelocity: { x: 0, y: 0, z: 0 },
                    position: { x: 0, y: 0, z: 0 },
                    quaternion: { x: 0, y: 0, z: 0, w: 1 },
                })
            }
            const move = rpc.data.move
            const force = new Vector3()
            force.z = move & MOVE_FORWARD ? 0.5 * dt : move & MOVE_BACKWARD ? -0.5 * dt : 0
            physicsObject.physicsImpostor.applyForce(force, physicsObject.physicsImpostor.physicsBody.position)

            console.log(rpc.tick, physicsObject.physicsImpostor.physicsBody.position.toString())
        })


    }
}
