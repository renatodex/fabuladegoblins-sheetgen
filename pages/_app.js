import 'styles/reset.css'
import 'styles/sheetgen.scss'
import 'styles/form.scss'
import 'styles/progress_bar.scss'
import 'pages/sheetgen/generator/breadcrumb'
import Link from 'next/link'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useRouter } from 'next/router'

// import 'nprogress/nprogress.css'; //styles of nprogress
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  let steps = [
    {
      key: 0,
      label: 'Escolher Nome',
      path: '1-choose-name',
    },
    {
      key: 1,
      label: 'Escolher Raça',
      path: '2-choose-race',
    },
    {
      key: 2,
      label: 'Escolher Classe',
      path: '3-choose-class',
    },
    {
      key: 3,
      label: 'Escolher Atributos',
      path: '4-choose-attributes',
    },
    {
      key: 4,
      label: 'Escolher Equipamentos',
      path: '5-choose-equipments',
    },
    {
      key: 5,
      label: 'Escolher Habilidades',
      path: '6-choose-spells',
    },
    {
      key: 6,
      label: 'Revisar',
      path: 'review',
    },
  ]

  let currentStep = steps.filter((step) => {
    return router.pathname.includes(step.path)
  })?.[0]?.key

  return (
    <div>
      <header>
        <img className={'appLogo'} src='/logo.png' width={300} />
        {
          process.env.NEXT_PUBLIC_SKIP_STEPS && (
            <nav>
              <p><Link href="/sheetgen/generator/1-choose-name"><a>Passo 1 - Escolher Nomes</a></Link></p>
              <p><Link href="/sheetgen/generator/2-choose-race"><a>Passo 2 - Escolher Raça</a></Link></p>
              <p><Link href="/sheetgen/generator/3-choose-class"><a>Passo 3 - Escolher Classe</a></Link></p>
              <p><Link href="/sheetgen/generator/4-choose-attributes"><a>Passo 4 - Escolher Atributos</a></Link></p>
              <p><Link href="/sheetgen/generator/5-choose-equipments"><a>Passo 5 - Escolher Equipamentos</a></Link></p>
              <p><Link href="/sheetgen/generator/6-choose-spells"><a>Passo 5 - Escolher Habilidades</a></Link></p>
              <p><Link href="/sheetgen/generator/review"><a>Review</a></Link></p>
            </nav>
          )
        }
      </header>

      <div className={'sheetGen'}>
        { currentStep != null && (
            <div className={'sheet-steps'}>
              <Stepper activeStep={currentStep}>
                {
                  steps.map((step) => {
                    return <Step key={step.label} completed={false}>
                      <StepLabel
                        optional={false}
                      >
                        {step.label}
                      </StepLabel>
                    </Step>
                  })
                }
              </Stepper>
            </div>
          )
        }


        <div className={'sheetGen__block'}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}
