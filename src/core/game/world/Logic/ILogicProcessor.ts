import type NetworkPackage from '../Network/NetworkPackage'

export interface ILogicProcessor {
    process(dt: number, networkPackages: Array<NetworkPackage>): void
}
