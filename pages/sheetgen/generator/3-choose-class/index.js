import Head from 'next/head'
import styles from './style.module.scss'
import SheetgenClassBlock from './class-block'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { store } from 'modules/redux_store'
import { fetchApi } from 'pages/airtable_client'

export async function getServerSideProps() {
  const fetchData = await fetchApi('classes')

  return {
    props: {
      allClasses: fetchData
    }
  }
}

export default function({ allClasses }) {
  // useEffect(() => {
  //   if (!store.getState().sheet_data.character_name) {
  //     Router.push('/sheetgen/generator')
  //   }
  // }, []);

  let selectClass = function ({ e, selectedClass }) {
    console.log('TODO: Guardar Escolha', e, selectedClass)
    store.dispatch({ type: 'SET_CHARACTER_CLASS', class_data: selectedClass })
    Router.push('/sheetgen/generator/4-choose-attributes')
  }

  let classes = function () {
    const options = []
    for (let i = 0; i < allClasses.length; i++) {
      options.push(
        <SheetgenClassBlock
          key={i}
          classData={allClasses[i]}
          onClickEvent={selectClass}
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
        <h1 className={styles.title}>Passo 3 - Selecione sua Classe</h1>

        <div className={styles['options-grid']}>
          { classes() }
        </div>
      </main>
    </div>
  )
}
