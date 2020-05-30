import Head from 'next/head'
import Router from 'next/router'
import styles from './style.module.scss'
import SheetgenEquipmentBlock from './equipment-block'
import { useState, useEffect } from 'react'
import { store } from 'modules/redux_store'

export default function() {
  let [allWeapons, setAllWeapons] = useState([])
  let [allArmors, setAllArmors] = useState([])
  let [selectedWeapon, setSelectedWeapon] = useState({})
  let [selectedArmor, setSelectedArmor] = useState({})

  useEffect(() => {
    if (!store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }

    const loadEquipments = async () => {
      let weaponsData = [
        {
          name: 'Espada',
          handle: 'espada',
          type: 'weapon',
          description: 'Uma simples espada',
        },
        {
          name: 'Axe',
          handle: 'axe',
          type: 'weapon',
          description: 'Uma simples axe',
        },
      ]
      setAllWeapons(weaponsData);
      let armorsData = [
        {
          name: 'Armadura',
          handle: 'armor',
          type: 'armor',
          description: 'Uma simples armadura',
        }
      ]
      setAllArmors(armorsData);
    };

    loadEquipments()
  }, []);


  let onSubmit = function (e) {
    console.log(equipments)
    Router.push('/sheetgen/generator/review')
    e.preventDefault()
  }

  let onSelectEquipmentEvent = function ({ e, equipmentData }) {
    console.log('Selecionou', e, equipmentData)
    if (equipmentData.type == 'armor') {
      setSelectedArmor(equipmentData)
    } else {
      setSelectedWeapon(equipmentData)
    }
    e.preventDefault()
  }

  let checkIfSelected = function (equipment) {
    if (equipment.type == 'armor') {
      return equipment.handle == selectedArmor.handle
    } else {
      return equipment.handle == selectedWeapon.handle
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

  return (
    <div className="container">
      <Head>
        <title>Gerador de Ficha</title>
      </Head>

      <main>
        <h1 className={styles.title}>Passo 5 - Escolher Equipamentos</h1>

        <form onSubmit={onSubmit}>

          <section>
            <h2>Armas</h2>
            { weapons() }
          </section>

          <section>
            <h2>Armaduras</h2>
            { armors() }
          </section>

          <div>
            <button type="submit">Continuar</button>
          </div>
        </form>
      </main>
    </div>
  )
}
