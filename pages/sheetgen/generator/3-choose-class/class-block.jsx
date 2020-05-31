export default function ClassBlock ({ classData, onClickEvent }) {
  return (
    <div>
      <p>
        <img src={classData.attachments?.[0]?.url} width={200}></img>
      </p>
      <h1>{ classData?.name }</h1>
      <p>{ classData?.description }</p>

      <button onClick={(e) => { onClickEvent({ e, selectedClass: classData }) }}>
        Selecionar
      </button>
    </div>
  )
}
