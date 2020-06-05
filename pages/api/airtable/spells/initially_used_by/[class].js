import { list } from 'pages/api/airtable/base'

export default async function handler(req, res) {
  let items = await list('GrimoSpells', {
    filterByFormula: `AND(min_level=1, FIND('${req.query.class}', ARRAYJOIN(_class__handle, ',')) > 0)`,
  })
  res.status(200).json(items)
}
