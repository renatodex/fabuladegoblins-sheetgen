export default function ClassBlock ({ classData, onClickEvent }) {
  return (
    <div>
      <h1>{ classData.name }</h1>
      <p>{ classData.description }</p>

      <button onClick={(e) => { onClickEvent({ e, selectedClass: classData }) }}>
        Selecionar
      </button>
    </div>
  )
}
