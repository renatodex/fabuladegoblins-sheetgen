import { list } from 'pages/api/airtable/base'

export default async function handler(req, res) {
  let races = await list('races')
  res.status(200).json(races)
}
