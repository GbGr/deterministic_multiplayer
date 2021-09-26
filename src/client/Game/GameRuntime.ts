import "@babylonjs/core/Debug/debugLayer"
import "@babylonjs/inspector"

import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'
import '@babylonjs/core/Materials/standardMaterial'
import '@babylonjs/core/Physics/physicsEngineComponent'
import { Scene } from '@babylonjs/core/scene'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'
import Ground from '../../common/components/Ground/Ground'
import CharacterPrefab from '../../common/prefabs/CharacterPrefab'
import BombPrefab from '../../common/prefabs/BombPrefab'
import LocalPlayer from '../../common/components/Player/LocalPlayer'
import AbstractPlayer from '../../common/components/Player/AbstractPlayer'

const stats = document.getElementById('stats')

export default class GameRuntime {
    private readonly engine: Engine
    private readonly scene: Scene
    private readonly camera: UniversalCamera
    private readonly light: HemisphericLight
    private readonly characterPrefab: CharacterPrefab
    private readonly bombPrefab: BombPrefab
    private readonly players: Array<AbstractPlayer> = []

    private readonly ground: Ground

    constructor(private readonly htmlCanvas: HTMLCanvasElement) {
        this.engine = new Engine(htmlCanvas, true, { powerPreference: 'high-performance' }, true)
        this.scene = new Scene(this.engine)
        this.camera = new UniversalCamera('mainCamera', new Vector3(0, 30, -50), this.scene)
        this.camera.rotation.set(Math.PI / 4.5, 0, 0)
        this.camera.attachControl(false)
        this.light = new HemisphericLight('hemi', Vector3.Up(), this.scene)
        this.scene.autoClear = false
        this.scene.autoClearDepthAndStencil = false

        this.ground = new Ground(this.scene)
        this.bombPrefab = new BombPrefab(this.scene)
        this.characterPrefab = new CharacterPrefab(this.scene, this.bombPrefab)

        this.players.push(new LocalPlayer(this.characterPrefab.instantiate()))

        this.scene.debugLayer.show()

        this.engine.runRenderLoop(this.render)
        window.addEventListener('resize', () => this.engine.resize())
    }

    private render = (): void => {
        stats.textContent = `FPS: ${Math.trunc(this.engine.getFps())}`
        const dt = this.engine.getDeltaTime()
        for (const player of this.players) {
            player.update(dt)
        }

        this.scene.render()
    }

    public dispose(): void {
        this.engine.stopRenderLoop(this.render)
        this.scene.dispose()
        this.engine.dispose()
    }
}
