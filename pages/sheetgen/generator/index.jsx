import Head from 'next/head'
import Link from 'next/link'

export default function Start() {
  return (
    <div className="container">
      <Head>
        <title>Create Sheet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Criador de Ficha</h1>

        <p>Esse gerador lhe auxiliará a criar sua ficha passo a passo.</p>

        <Link href="/sheetgen/generator/1-choose-name">
          <a className={'button'}>Nova Ficha</a>
        </Link>
      </main>

      <footer>
      </footer>
    </div>
  )
}
