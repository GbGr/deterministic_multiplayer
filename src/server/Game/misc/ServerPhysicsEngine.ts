import { IPhysicsEngine } from '../../../common/misc/IPhysicsEngine'
import * as path from 'path'

const Ammo = require('../../../../public/scripts/ammo.wasm.js')

const ServerPhysicsEngine = new class implements IPhysicsEngine {
    private ammo: any

    getEngine(): any {
        return this.ammo
    }

    init(): Promise<void> {
        return Ammo({ locateFile: () => path.resolve(process.cwd(), './public/scripts/ammo.wasm.wasm') }).then((ammo) => {
            this.ammo = ammo
            return undefined
        })
    }
}()

export default ServerPhysicsEngine
