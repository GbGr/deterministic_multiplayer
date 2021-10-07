import '@abraham/reflection'
import { container } from 'tsyringe'
import { Platform, PLATFORM_ID } from './di/Platform'
import { CANVAS_ELEMENT } from './di/CanvasElement'
import { Scene } from '@babylonjs/core/scene'
import { Engine } from '@babylonjs/core/Engines/engine'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
import EngineFactory from './game/engine/EngineFactory'
import SceneFactory from './game/scene/SceneFactory'
import GameRuntime from './game/runtime/GameRuntime'
import GameRuntimeFactory from './game/runtime/GameRuntimeFactory'
import Input from './game/world/Input/Input'
import { NETWORK_TRANSPORT, NetworkTransportFactory } from './game/world/Network/transport/NetworkTransportFactory'
import { PHYSICS_PLUGIN, PhysicsPluginFactory } from './game/physics/PhysicsPlugin'

export default function startupGameCore(platform: Platform, htmlCanvasElement?: HTMLCanvasElement): GameRuntime {
    const containerInstance = container.createChildContainer()
    containerInstance.register<Platform>(PLATFORM_ID, { useValue: platform })
    containerInstance.register<HTMLCanvasElement>(CANVAS_ELEMENT, { useValue: htmlCanvasElement })
    containerInstance.register<Engine>(Engine, { useFactory: EngineFactory })
    containerInstance.register<CannonJSPlugin>(PHYSICS_PLUGIN, { useFactory: PhysicsPluginFactory })
    containerInstance.register<Scene>(Scene, { useFactory: SceneFactory })
    containerInstance.register<GameRuntime>(GameRuntime, { useFactory: GameRuntimeFactory })
    containerInstance.register(NETWORK_TRANSPORT, { useFactory: NetworkTransportFactory })
    containerInstance.resolve(Input)

    return containerInstance.resolve(GameRuntime)
}
