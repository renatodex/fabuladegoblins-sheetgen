import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    Router.push('/sheetgen/generator')
  })

  return <div>Loading...</div>
}
