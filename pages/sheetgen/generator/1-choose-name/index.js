import Head from 'next/head'
import Router from 'next/router'
import styles from './style.module.scss'
import { store } from 'modules/redux_store'
import { useState } from 'react'

export default function() {
  let [characterName, setCharacterName] = useState(
    store.getState().sheet_data.character_name,
  )

  let [playerName, setPlayerName] = useState(
    store.getState().sheet_data.player_name,
  )

  var onSubmit = function (e) {
    store.dispatch({
      type: 'SET_NAMES',
      character_name: characterName,
      player_name: playerName,
    })
    Router.push('/sheetgen/generator/2-choose-race')
    e.preventDefault()
  }

  return (
    <div className="container">
      <Head>
        <title>Gerador de Ficha</title>
      </Head>

      <main>
        <h1 className={'white-title'}>Passo 1 - Informe seu nome e o do Personagem</h1>

        <form onSubmit={onSubmit}>
          <div style={{
            'marginBottom': '10px',
          }}>
            <label>Nome do Jogador</label>
            <input
              type="text"
              name="player_name"
              defaultValue={playerName}
              onChange={e => setPlayerName(e.target.value)}
            />
          </div>

          <div>
            <label>Nome do Personagem</label>
            <input
              type="text"
              name="character_name"
              defaultValue={characterName}
              onChange={e => setCharacterName(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">Continuar</button>
          </div>
        </form>
      </main>
    </div>
  )
}
