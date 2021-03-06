import { Lifecycle, scoped } from 'tsyringe'
import { Scene } from '@babylonjs/core/scene'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'

@scoped(Lifecycle.ContainerScoped)
export default class MainCamera extends UniversalCamera {
    constructor(private readonly scene: Scene) {
        super('MainCamera', new Vector3(0, 1, -30), scene)
        this.rotation.set(0, 0, 0)
    }
}
