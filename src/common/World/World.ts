import Logic from './Logic'
import Network from './Network'
import Model from './Model'
import Input from './Input'
import InputActionService from './InputActionService'
import ModelHistory from './ModelHistory'
import ActionsQueue from './ActionsQueue'

export const LOGIC_TICK_RATE = 30
export const LOGIC_DT = 1000 / LOGIC_TICK_RATE
export const CLIENT_SYNC_RATE = 10

export default class World {
    private readonly input: Input
    private readonly logic: Logic
    public readonly model: Model
    private readonly network: Network
    private readonly actionsQueue: ActionsQueue
    private readonly modelHistory: ModelHistory
    private timeSinceStart: number
    private ticksSinceStart: number

    constructor() {
        this.actionsQueue = new ActionsQueue()
        this.network = new Network(this.actionsQueue)
        this.input = new Input(this.network)
        this.model = new Model()
        this.logic = new Logic(this.actionsQueue, this.model)
        this.modelHistory = new ModelHistory()
        this.timeSinceStart = 0
        this.ticksSinceStart = 0

        InputActionService.moveActionEvent.on((moveAction) => this.input.update(moveAction))
    }

    public update(from: number, to: number): void {
        for (let i = from; i < to; i++) {
            this.logic.update(i, LOGIC_DT)
            if (i % CLIENT_SYNC_RATE === 0) {
                this.modelHistory.update(i, this.model.copy())
            }
        }
    }

    public updateTick(dt: number): void {
        this.timeSinceStart += dt
        const toTick = Math.floor(this.timeSinceStart / LOGIC_DT)

        if (this.ticksSinceStart === toTick) return

        this.update(this.ticksSinceStart, toTick)

        this.ticksSinceStart = toTick
        InputActionService.setTickSinceStart(this.ticksSinceStart)
        this.actionsQueue.updateTickSinceStart(this.ticksSinceStart)
    }
}
