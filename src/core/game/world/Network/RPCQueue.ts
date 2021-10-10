import { Lifecycle, scoped } from 'tsyringe'
import NetworkPackage from './NetworkPackage'
import BoundedMap from '../../../misc/BoundedMap'

const RMC_QUEUE_LIMIT = 1000

@scoped(Lifecycle.ContainerScoped)
export default class RPCQueue extends BoundedMap<number, Array<NetworkPackage>> {
    private _lowerTick: number = -1

    constructor() {
        super(RMC_QUEUE_LIMIT)
    }

    public get(k: number): Array<NetworkPackage> {
        return super.get(k) || []
    }

    public enqueueNetworkPackage(v: NetworkPackage): void {
        if (this._lowerTick === -1 || this._lowerTick > v.tick) this._lowerTick = v.tick

        const tickPackages = this.get(v.tick)
        tickPackages.push(v)
        tickPackages.sort(orderTickNetworkPackages)

        this.set(v.tick, tickPackages)
    }

    public getInvalidateLowerTick(): number {
        const lowerTick = this._lowerTick
        this._lowerTick = -1

        return lowerTick
    }
}

function orderTickNetworkPackages(left: NetworkPackage, right: NetworkPackage): number {
    return left.playerId - right.playerId || left.ts - right.ts
}
