import styles from './style.module.scss'

export default function RaceBlock ({ race, onClickEvent }) {
  return (
    <div className={styles['race-block']}>
      <img src={race?.attachments?.[0]?.url} width={'100%'}></img>
      <h1>{ race?.name }</h1>
      <p>{ race?.description }</p>

      <button
        onClick={(e) => { onClickEvent({ e, race }) }}
        disabled={!race?.available}
      >
        Selecionar
      </button>
    </div>
  )
}
