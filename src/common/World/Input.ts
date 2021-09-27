import Network from './Network'
import { InputAction } from './InputActionService'

export default class Input {
    private readonly network: Network

    constructor(network: Network) {
        this.network = network
    }

    public update(action: InputAction): void {
        this.network.update(action)
    }
}
