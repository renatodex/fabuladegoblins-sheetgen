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

  const spells = fetchData.filter((spell) => {
    return !spell.special_attack
  })

  const ultimates = fetchData.filter((spell) => {
    return spell.special_attack == true
  })

  console.log(ultimates)

  return {
    props: {
      allSpells: spells,
      allUltimates: ultimates,
    }
  }
}

export default function({ allSpells, allUltimates }) {
  let [selectedSpells, setSelectedSpells] = useState([])
  let [selectedUltimates, setSelectedUltimates] = useState([])

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SKIP_STEPS && !store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }
  }, []);


  let onSubmit = function (e) {
    if (!selectedSpells.count < 2 && selectedUltimates.count > 0) {
      alert('Selecione todas as suas habilidades!')
    } else {
      store.dispatch({
        type: 'SET_SPELLS',
        spells: selectedSpells,
        ultimates: selectedUltimates,
      })
      Router.push('/sheetgen/generator/review')
    }
    e.preventDefault()
  }

  let onSelectSpellEvent = function ({ e, spellData, selected }) {
    if (!selected) {
      console.log('Adicionar')
      if (selectedSpells.length < 2) {
        setSelectedSpells(selectedSpells.concat(spellData))
        console.log('Vamovedepois', selectedSpells)
      } else {
        console.log('Chegou ao limite de Spells')
      }
    } else {
      console.log('Remover')
      setSelectedSpells(
        selectedSpells.filter((selectedSpell) => selectedSpell.id != spellData.id)
      )
    }
    e.preventDefault()
  }

  let onSelectUltimateEvent = function ({ e, spellData, selected }) {
    if (!selected) {
      if (selectedUltimates.length < 1) {
        setSelectedUltimates(selectedUltimates.concat(spellData))
      }
    } else {
      setSelectedUltimates(
        selectedUltimates.filter((selectedUltimate) => selectedUltimate.id != spellData.id)
      )
    }
    e.preventDefault()
  }

  let checkIfSelected = function (selectedSpell) {
    let filtering = selectedSpells.filter((spell) => {
      return spell.id == selectedSpell.id
    }).length

    return filtering > 0
  }

  let checkIfUltimateSelected = function (selectedUltimate) {
    console.log('selectedUltimates', selectedUltimates)
    console.log('selectedUltimates', selectedUltimate)
    let filtering = selectedUltimates.filter((spell) => {
      return spell.id == selectedUltimate.id
    }).length

    return filtering > 0
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

  let ultimates = function () {
    const options = []
    console.log('allUlts', allUltimates)
    for (let i = 0; i < allUltimates.length; i++) {
      options.push(
        <SheetgenSpellBlock
          key={i}
          spellData={allUltimates[i]}
          onSelectSpellEvent={onSelectUltimateEvent}
          selected={checkIfUltimateSelected(allUltimates[i])}
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
        <h1 className={'white-title'}>Passo 6.1 - Habilidades do Grimo</h1>
        <h2 className={styles.subtitle}>Selecione Duas (2) Habilidades iniciais</h2>

        <form onSubmit={onSubmit}>
          <section className={styles['equip-category']}>
            <h1>Selecione suas Habilidades</h1>
            <div className={styles['options-grid']}>
              { spells() }
            </div>
          </section>

          <section className={styles['equip-category']}>
            <h1 className={'white-title'}>Passo 6.2 - Selecione seus Ultimates</h1>
            <div className={styles['options-grid']}>
              { ultimates() }
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
