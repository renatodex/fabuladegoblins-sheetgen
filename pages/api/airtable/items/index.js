import { list } from 'pages/api/airtable/base'

export default async function handler(req, res) {
  let items = await list('items', {
    filterByFormula: req.query.filter,
  })
  res.status(200).json(items)
}
