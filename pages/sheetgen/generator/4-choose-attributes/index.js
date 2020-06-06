import Head from 'next/head'
import styles from './style.module.scss'
import SheetgenAttributeBlock from './attribute-block'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { store } from 'modules/redux_store'

export default function() {
  const MAX_ATTRIBUTE_POINTS = 30

  let [attributeValues, setAttributeValues] = useState({
    strength: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0,
    destiny: 0,
  })

  let [allAttributes, setAllAttributes] = useState([])

  let [maxPoints, setMaxPoints] = useState(MAX_ATTRIBUTE_POINTS)
  let [remainingPoints, setRemainingPoints] = useState(MAX_ATTRIBUTE_POINTS)

  useEffect(() => {
    if (!store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }

    const fetchData = async () => {
      let result = [
        {
          handle: 'strength',
          name: 'Força',
          description: 'Diz o quanto você é Forte'
        },
        {
          handle: 'agility',
          name: 'Agilidade',
          description: 'Diz o quanto você é Agil'
        },
        {
          handle: 'intelligence',
          name: 'Inteligencia',
          description: 'Diz o quanto você é Inteligente'
        },
        {
          handle: 'charisma',
          name: 'Carisma',
          description: 'Diz o quanto você é Social'
        },
        {
          handle: 'destiny',
          name: 'Destino',
          description: 'Diz o quanto você é Predestinado'
        },
      ]
      setAllAttributes(result);
    };

    fetchData()
  }, []);

  let onChangeEvent = async ({e, attribute, newValue }) => {
    let newAttributeValues = Object.assign(attributeValues, {
      [attribute.handle]: newValue,
    })
    let pointsApplied = Object.values(newAttributeValues).reduce((a,b) => a+b)
    if (pointsApplied >= 0 && pointsApplied <= maxPoints) {
      await setAttributeValues(newAttributeValues)
      setRemainingPoints(maxPoints - pointsApplied)
    }
  }

  let attributes = function () {
    const options = []
    for (let i = 0; i < allAttributes.length; i++) {
      options.push(
        <SheetgenAttributeBlock
          key={i}
          attribute={allAttributes[i]}
          onChangeEvent={onChangeEvent}
          remainingPoints={remainingPoints}
        />
      )
    }

    return options
  }

  let onSubmit = function (e) {
    if (remainingPoints == 0) {
      store.dispatch({ type: 'SET_ATTRIBUTES', attributes_data: attributeValues })
      Router.push('/sheetgen/generator/5-choose-equipments')
    } else {
      alert('Você ainda tem pontos para distribuir!')
    }
    e.preventDefault();
  }

  return (
    <div className="container">
      <Head>
        <title>Gerador de Ficha</title>
      </Head>

      <main>
        <div className={styles['attribute-header']}>
          <h1 className={'white-title'}>Passo 4 - Defina seus Atributos</h1>
          <h2>Você possui {remainingPoints} de {maxPoints} pontos para distribuir.</h2>
        </div>

        <div className={styles['options-grid']}>
          { attributes() }
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <button>Continuar</button>
          </div>
        </form>
      </main>
    </div>
  )
}
