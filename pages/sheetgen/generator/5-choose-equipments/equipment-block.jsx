export default function EquipmentBlock ({ equipmentData, onSelectEquipmentEvent, selected }) {
  return (
    <div>
      <h1>{ equipmentData.name } {selected && (
          <span>(selected)</span>
        )}</h1>
      <p>{ equipmentData.description }</p>

      <button onClick={(e) => { onSelectEquipmentEvent({ e, equipmentData }) }}>
        Selecionar
      </button>
    </div>
  )
}
