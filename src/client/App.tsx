import './App.css'
import React, { FC } from 'react'
import Game from './Game'

const App: FC = () => {
    return (
        <section className='game'>
            <Game />
            <section className='game__ui ui' />
        </section>
    )
}

export default App
