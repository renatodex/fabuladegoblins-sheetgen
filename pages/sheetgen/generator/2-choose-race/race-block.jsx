export default function RaceBlock ({ race, onClickEvent }) {
  return (
    <div>
      <h1>{ race.name }</h1>
      <p>{ race.description }</p>

      <button onClick={(e) => { onClickEvent({ e, race }) }}>
        Selecionar
      </button>
    </div>
  )
}
