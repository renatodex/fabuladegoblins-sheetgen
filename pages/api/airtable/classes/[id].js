import { retrieve } from 'pages/api/airtable/base'

export default async function handler(req, res) {
  let classes = await retrieve(`classes/${req.query.id}`)
  res.status(200).json(classes)
}
