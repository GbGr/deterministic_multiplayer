import type NetworkPackage from '../Network/NetworkPackage'

export interface LogicProcessor {
    process(dt: number, networkPackages: Array<NetworkPackage>): void
}
