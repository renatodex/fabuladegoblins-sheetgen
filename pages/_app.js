import 'styles/reset.css'
import 'styles/sheetgen.scss'
import 'styles/form.scss'
import 'pages/sheetgen/generator/breadcrumb'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header>
        <img className={'appLogo'} src='/logo.png' width={300} />
      </header>



      <div className={'sheetGen'}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
