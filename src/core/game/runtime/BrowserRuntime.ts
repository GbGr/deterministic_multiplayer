// import '@babylonjs/core/Debug/debugLayer'
// import '@babylonjs/inspector'

import { Lifecycle, scoped } from 'tsyringe'
import { Scene } from '@babylonjs/core/scene'
import { Engine } from '@babylonjs/core/Engines/engine'
import GameRuntime from './GameRuntime'
import MainCamera from '../cameras/MainCamera'
import World from '../world/World'
import Network from '../world/Network/Network'

@scoped(Lifecycle.ContainerScoped)
export default class BrowserRuntime extends GameRuntime {
    constructor(
        engine: Engine,
        scene: Scene,
        camera: MainCamera,
        world: World,
        network: Network) {
        super(engine, scene, camera, world, network)
        // @ts-ignore
        window.runtume = this
    }


    public update = () => {
        const dt = this._engine.getDeltaTime()
        super.update(dt)
    }

    public runRenderLoop(): void {
        // this._scene.debugLayer.show()
        this._engine.runRenderLoop(this.update)
    }

    public stopRenderLoop(): void {
        this._engine.stopRenderLoop(this.update)
    }
}
