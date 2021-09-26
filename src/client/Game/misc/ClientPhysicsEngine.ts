import { IPhysicsEngine } from '../../../common/misc/IPhysicsEngine'

const ClientPhysicsEngine = new class implements IPhysicsEngine {
    private ammo: any

    getEngine(): any {
        return this.ammo
    }

    init(): Promise<void> {
        return globalThis.Ammo({
            locateFile: () => '/scripts/ammo.wasm.wasm'
        }).then((ammo) => {
            this.ammo = ammo
            return undefined
        })
    }
}()

export default ClientPhysicsEngine
