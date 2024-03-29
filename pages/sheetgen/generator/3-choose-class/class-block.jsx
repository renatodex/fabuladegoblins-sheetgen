import styles from './style.module.scss'

export default function ClassBlock ({ classData, onClickEvent }) {
  return (
    <div className={styles['class-block']}>
      <p>
        <img src={classData?.attachments?.[0]?.url} width={'100%'}></img>
      </p>
      <h1>{ classData?.name }</h1>
      <p>{ classData?.description }</p>

      <button
        onClick={(e) => { onClickEvent({ e, selectedClass: classData }) }}
        disabled={!classData?.available}
      >
        Selecionar
      </button>
    </div>
  )
}
