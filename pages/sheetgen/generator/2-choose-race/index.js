import Head from 'next/head'
import styles from './style.module.scss'
import SheetgenRaceBlock from './race-block'
import Router from 'next/router'
import { store } from 'modules/redux_store'
import { useEffect, useState } from 'react'

export default function() {
  let [allRaces, setAllRaces] = useState([])

  useEffect(() => {
    if (!store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }

    const fetchData = async () => {
      let result = [
        {
          name: 'Goblin',
          description: 'O Goblin é comum'
        }
      ]
      setAllRaces(result);
    };

    fetchData()
  }, []);

  let selectRace = function ({ e, race }) {
    console.log('TODO: Guardar Escolha', e, race)
    store.dispatch({ type: 'SET_CHARACTER_RACE', race_data: race })
    Router.push('/sheetgen/generator/3-choose-class')
  }

  let races = function () {
    const options = []
    for (let i = 0; i < allRaces.length; i++) {
      options.push(
        <SheetgenRaceBlock
          key={i}
          race={allRaces[i]}
          onClickEvent={selectRace}
        />
      )
    }

    return options
  }

  return (
    <div className="container">
      <Head>
        <title>Gerador de Ficha</title>
      </Head>

      <main>
        <h1 className={styles.title}>Passo 2 - Selecione sua Raça</h1>

        { races() }
      </main>
    </div>
  )
}
