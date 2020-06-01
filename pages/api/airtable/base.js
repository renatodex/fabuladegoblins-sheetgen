export async function list (resource, options = {}) {
  const BASE_URL = process.env.AIRTABLE_API_BASE_URL
  const APP_ID = process.env.AIRTABLE_APP_ID
  const API_KEY = process.env.AIRTABLE_API_KEY

  options.maxRecords = options.maxRecords || 20
  options.view = options.view || 'Grid%20view'
  options.filterByFormula = encodeURIComponent(options.filterByFormula || '')

  let url = `${BASE_URL}/${APP_ID}/${resource}?maxRecords=${options.maxRecords}&view=${options.view}&filterByFormula=${options.filterByFormula}`
  console.log(url)

  const data = await fetch(
    url,
    { headers: { 'Authorization': `Bearer ${API_KEY}` }
  })

  return await data.json();
}

export async function retrieve (resource) {
  const BASE_URL = process.env.AIRTABLE_API_BASE_URL
  const APP_ID = process.env.AIRTABLE_APP_ID
  const API_KEY = process.env.AIRTABLE_API_KEY

  let url = `${BASE_URL}/${APP_ID}/${resource}`

  const data = await fetch(url,
    { headers: { 'Authorization': `Bearer ${API_KEY}` },
  })

  return await data.json();
}
