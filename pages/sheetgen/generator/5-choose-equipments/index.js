import Head from 'next/head'
import Router from 'next/router'
import styles from './style.module.scss'
import SheetgenEquipmentBlock from './equipment-block'
import { useState, useEffect } from 'react'
import { store } from 'modules/redux_store'
import { fetchApi } from 'pages/airtable_client'
import cookieParser from 'modules/cookie_parser'

export async function getServerSideProps({ req }) {
  let cookieData = cookieParser(req.headers.cookie)

  const fetchData = await fetchApi(
    `items/initially_used_by/${cookieData.selected_class_handle}`
  )

  let armors = fetchData.filter((item) => {
    let handles = item['_item_types__handle'].join(',')
    return handles.includes('armor')
  })

  let weapons = fetchData.filter((item) => {
    let handles = item['_item_types__handle'].join(',')
    return handles.includes('weapon')
  })

  let grimos = fetchData.filter((item) => {
    let handles = item['_item_types__handle'].join(',')
    return handles.includes('grimo')
  })

  return {
    props: {
      allWeapons: weapons,
      allArmors: armors,
      allGrimos: grimos,
    }
  }
}

export default function({ allWeapons, allArmors, allGrimos }) {
  let [selectedWeapon, setSelectedWeapon] = useState({})
  let [selectedArmor, setSelectedArmor] = useState({})
  let [selectedGrimo, setSelectedGrimo] = useState({})

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SKIP_STEPS && !store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }
  }, []);


  let onSubmit = function (e) {
    if (!selectedWeapon || !selectedArmor || !selectedGrimo) {
      alert('Selecione sua Arma, Armadura e Grimo iniciais!')
    } else {
      store.dispatch({
        type: 'SET_EQUIPMENTS',
        weapon: selectedWeapon,
        armor: selectedArmor,
        grimo: selectedGrimo,
      })
      Router.push('/sheetgen/generator/6-choose-spells')
    }
    e.preventDefault()
  }

  let onSelectEquipmentEvent = function ({ e, equipmentData }) {
    console.log('Selecionou', e, equipmentData)
    if (equipmentData['_item_types__handle'] == 'armor') {
      setSelectedArmor(equipmentData)
    } else if(equipmentData['_item_types__handle'] == 'weapon') {
      setSelectedWeapon(equipmentData)
    } else {
      setSelectedGrimo(equipmentData)
    }
    e.preventDefault()
  }

  let checkIfSelected = function (equipment) {
    if (equipment['_item_types__handle'] == 'armor') {
      return equipment.handle == selectedArmor.handle
    } else if (equipment['_item_types__handle'] == 'weapon') {
      return equipment.handle == selectedWeapon.handle
    } else {
      return equipment.handle == selectedGrimo.handle
    }
  }

  let weapons = function () {
    const options = []
    for (let i = 0; i < allWeapons.length; i++) {
      options.push(
        <SheetgenEquipmentBlock
          key={i}
          equipmentData={allWeapons[i]}
          onSelectEquipmentEvent={onSelectEquipmentEvent}
          selected={checkIfSelected(allWeapons[i])}
        />
      )
    }

    return options
  }

  let armors = function () {
    const options = []
    for (let i = 0; i < allArmors.length; i++) {
      options.push(
        <SheetgenEquipmentBlock
          key={i}
          equipmentData={allArmors[i]}
          onSelectEquipmentEvent={onSelectEquipmentEvent}
          selected={checkIfSelected(allArmors[i])}
        />
      )
    }
    return options
  }

  let grimos = function () {
    const options = []
    for (let i = 0; i < allGrimos.length; i++) {
      options.push(
        <SheetgenEquipmentBlock
          key={i}
          equipmentData={allGrimos[i]}
          onSelectEquipmentEvent={onSelectEquipmentEvent}
          selected={checkIfSelected(allGrimos[i])}
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
        <form onSubmit={onSubmit}>

          <section className={styles['equip-category']}>
            <h1 className={'white-title'}>Passo 5.1 - Escolher Arma</h1>

            <div className={styles['options-grid']}>
              { weapons() }
            </div>
          </section>

          <section className={styles['equip-category']}>
            <h1 className={'white-title'}>Passo 5.2 - Escolher Armadura</h1>

            <div className={styles['options-grid']}>
              { armors() }
            </div>
          </section>

          <section className={styles['equip-category']}>
            <h1 className={'white-title'}>Passo 5.3 - Escolher Grimo Inicial</h1>

            <div className={styles['options-grid']}>
              { grimos() }
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
