import type { IVector3Like } from '@babylonjs/core/Maths/math.like'
import type { float } from '@babylonjs/core/types'

export class Vector3Struct implements IVector3Like {
    constructor(
        public x: float = 0,
        public y: float = 0,
        public z: float = 0,
    ) {}
}
