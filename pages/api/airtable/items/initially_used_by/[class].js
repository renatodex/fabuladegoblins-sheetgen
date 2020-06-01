import { list } from 'pages/api/airtable/base'

export default async function handler(req, res) {
  let items = await list('items', {
    filterByFormula: `FIND('${req.query.class}', ARRAYJOIN(_used_by__handle, ',')) > 0`,
  })
  res.status(200).json(items)
}
