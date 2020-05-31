export async function fetchApi (path) {
  let data = await fetch(`${process.env.APP_HOST}/api/airtable/${path}`)
  let jsonData = await data.json()

  if (jsonData.records) {
    return jsonData.records.map((record) => mapAirtableRow(record))
  } else {
    return mapAirtableRow(jsonData)
  }
}

export function mapAirtableRow(row) {
  return { id: row.id, createdTime: row.createdTime, ...row.fields }
}

export default function () {
  return true
}
