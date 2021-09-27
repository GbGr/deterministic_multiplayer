import { InputAction } from './InputActionService'

export default class ActionsQueue {
    private readonly actions: Map<number, Array<NetworkAction>>
    private tickSinceStart: number

    constructor() {
        this.actions = new Map<number, Array<NetworkAction>>()
        this.tickSinceStart = 0
    }

    public updateTickSinceStart(tickSinceStart: number): void {
        this.tickSinceStart = tickSinceStart
    }

    public getTickActions(tick: number): Array<NetworkAction> {
        return this.actions.get(tick) || []
    }

    public update(action: NetworkAction): void {
        if (!this.actions.has(action.tick)) this.actions.set(action.tick, [])
        this.actions.get(action.tick).push(action)
        // TODO: if tick lower then current rollback state
    }
}

export type NetworkAction = InputAction<{ pid: string }>
