import styles from './style.module.scss'

export default function EquipmentBlock ({ equipmentData, onSelectEquipmentEvent, selected }) {
  return (
    <div className={styles['equipment-block']}>
      <img src={equipmentData?.attachments?.[0]?.url} width={'100%'}></img>
      <h1>{ equipmentData?.name } {selected && (
          <span>(selected)</span>
        )}</h1>
      <p>{ equipmentData?.description }</p>

      <button onClick={(e) => { onSelectEquipmentEvent({ e, equipmentData }) }}>
        Selecionar
      </button>
    </div>
  )
}
