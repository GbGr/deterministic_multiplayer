import React, { createRef, FC, useEffect } from 'react'
import classes from './Game.module.sass'
import GameRuntime from './GameRuntime'
import ClientPhysicsEngine from './misc/ClientPhysicsEngine'

const Game: FC = () => {
    const renderCanvasRef = createRef<HTMLCanvasElement>()

    useEffect(() => {
        if (!renderCanvasRef.current) return
        let gameRuntime: GameRuntime
        ClientPhysicsEngine.init().then(() => {
            gameRuntime = new GameRuntime(renderCanvasRef.current)
        })

        return () => {
            if (gameRuntime) gameRuntime.dispose()
        }
    }, [])

    return (
        <canvas className={classes.renderCanvas} ref={renderCanvasRef} />
    )
}

export default Game
