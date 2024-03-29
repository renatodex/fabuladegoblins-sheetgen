import Head from 'next/head'
import styles from './style.module.scss'
import SheetgenRaceBlock from './race-block'
import Router from 'next/router'
import { store } from 'modules/redux_store'
import { useEffect, useState } from 'react'
import { fetchApi } from 'pages/airtable_client'

export async function getServerSideProps() {
  const fetchData = await fetchApi('races')

  return {
    props: {
      allRaces: fetchData
    }
  }
}

export default function({ allRaces }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SKIP_STEPS && !store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }
  }, []);

  let selectRace = function ({ e, race }) {
    console.log('TODO: Guardar Escolha', e, race)
    store.dispatch({ type: 'SET_CHARACTER_RACE', race_data: race })
    Router.push('/sheetgen/generator/3-choose-class')
  }

  let races = function () {
    const options = []
    for (let i = 0; i < allRaces.length; i++) {
      console.log('All Races', allRaces[i])
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
        <h1 className={'white-title'}>Passo 2 - Selecione sua Raça</h1>

        <div className={styles['options-grid']}>
          { races() }
        </div>
      </main>
    </div>
  )
}
