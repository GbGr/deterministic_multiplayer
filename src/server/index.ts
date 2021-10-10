process.env.DEBUG = '*'
import { Server } from '@colyseus/core'
import { uWebSocketsTransport } from '@colyseus/uwebsockets-transport'
import GameRoom from './GameRoom'

const PORT = 7777

const transport = new uWebSocketsTransport({

})

const gameServer = new Server({
    transport,
})

gameServer.simulateLatency(200)

gameServer.define('GameRoom', GameRoom)

gameServer.listen(PORT).then(() => {
    console.log(`game server is listening on: http://localhost:${PORT}`)
})
