export async function list (resource, options = {}) {
  const BASE_URL = process.env.AIRTABLE_API_BASE_URL
  const APP_ID = process.env.AIRTABLE_APP_ID
  const API_KEY = process.env.AIRTABLE_API_KEY

  const data = await fetch(
    `${BASE_URL}/${APP_ID}/${resource}?maxRecords=${options.maxRecords || 3}&view=${options.view || 'Grid%20view'}`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` }
  })

  return await data.json();
}

export async function retrieve (resource) {
  const BASE_URL = process.env.AIRTABLE_API_BASE_URL
  const APP_ID = process.env.AIRTABLE_APP_ID
  const API_KEY = process.env.AIRTABLE_API_KEY

  const data = await fetch(
    `${BASE_URL}/${APP_ID}/${resource}`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` }
  })

  return await data.json();
}
