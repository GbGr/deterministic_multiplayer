import React, { createRef, FC, useEffect } from 'react'
import startupGameCore from '../../core'
import { Platform } from '../../core/di/Platform'

const Game: FC = () => {
    const renderCanvasRef = createRef<HTMLCanvasElement>()

    useEffect(() => {
        if (!renderCanvasRef.current) return
        const gameRuntime = startupGameCore(Platform.BROWSER, renderCanvasRef.current)

        gameRuntime.runRenderLoop()

        return () => {
            if (gameRuntime) gameRuntime.stopRenderLoop()
        }
    }, [])

    return (
        <canvas className='game__canvas' ref={renderCanvasRef} />
    )
}

export default Game
