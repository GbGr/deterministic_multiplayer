import { InputAction } from './InputActionService'
import ActionsQueue from './ActionsQueue'

export default class Network {
    private readonly pid: string = Math.random().toString(32).slice(2)
    private readonly actionsQueue: ActionsQueue

    constructor(actionsQueue: ActionsQueue) {
        this.actionsQueue = actionsQueue
        // TODO: subscribe for server actions
    }

    public update(action: InputAction): void {
        const networkAction = { ...(action as any), pid: this.pid }
        this.actionsQueue.update(networkAction)
        // TODO: send to server
    }
}
