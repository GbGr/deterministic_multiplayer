import Model from './Model'

export default class ModelHistory {
    private readonly data: { [key: number]: Model }

    constructor() {
        this.data = {}
    }

    public update(tick: number, model: Model): void {
        this.data[tick] = model
    }

    public get(tick: number = 0): Model {
        return this.data[tick]
    }
}
