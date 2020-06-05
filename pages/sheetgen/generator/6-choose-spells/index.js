import Head from 'next/head'
import Router from 'next/router'
import styles from './style.module.scss'
import SheetgenSpellBlock from './spell-block'
import { useState, useEffect } from 'react'
import { store } from 'modules/redux_store'
import { fetchApi } from 'pages/airtable_client'
import cookieParser from 'modules/cookie_parser'

export async function getServerSideProps({ req }) {
  let cookieData = cookieParser(req.headers.cookie)

  const fetchData = await fetchApi(
    `spells/initially_used_by/${cookieData.selected_class_handle}`
  )

  return {
    props: {
      allSpells: fetchData,
    }
  }
}

export default function({ allSpells }) {
  let [selectedSpells, setSelectedSpells] = useState([])

  console.log('All Spells', allSpells)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SKIP_STEPS && !store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }
  }, []);


  let onSubmit = function (e) {
    if (!selectedSpells.count < 2) {
      alert('Selecione todas as suas habilidades!')
    } else {
      store.dispatch({
        type: 'SET_SPELLS',
        spells: selectedSpells,
      })
      Router.push('/sheetgen/generator/review')
    }
    e.preventDefault()
  }

  let onSelectSpellEvent = function ({ e, equipmentData }) {
    // console.log('Selecionou', e, equipmentData)
    // if (equipmentData['_item_types__handle'] == 'armor') {
    //   setSelectedArmor(equipmentData)
    // } else {
    //   setSelectedWeapon(equipmentData)
    // }
    e.preventDefault()
  }

  let checkIfSelected = function (selectedSpell) {
    return allSpells.filter((spell) => {
      spell.id == selectedSpell.id
    }).length > 1
  }

  let spells = function () {
    const options = []
    for (let i = 0; i < allSpells.length; i++) {
      options.push(
        <SheetgenSpellBlock
          key={i}
          spellData={allSpells[i]}
          onSelectSpellEvent={onSelectSpellEvent}
          selected={checkIfSelected(allSpells[i])}
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
        <h1 className={styles.title}>Passo 6 - Habilidades Iniciais</h1>
        <h2 className={styles.subtitle}>Selecione Duas (2) Habilidades iniciais</h2>

        <form onSubmit={onSubmit}>

          <section className={styles['equip-category']}>
            <div className={styles['options-grid']}>
              { spells() }
            </div>
          </section>

          <div>
            <button type="submit">Continuar</button>
          </div>
        </form>
      </main>
    </div>
  )
}
