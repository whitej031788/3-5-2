import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
  }

  const { league_id, player_id } = req.query
  try {
    if (!league_id) {
      return res.status(400).json({ message: '`league_id` required' })
    }
    if (typeof parseInt(league_id.toString()) !== 'number') {
      return res.status(400).json({ message: '`league_id` must be a number' })
    }
    if (!player_id) {
      return res.status(400).json({ message: '`player_id` required' })
    }
    if (typeof parseInt(player_id.toString()) !== 'number') {
      return res.status(400).json({ message: '`player_id` must be a number' })
    }
    // const results = await query(
    //   `
    //   SELECT DISTINCT p.id,p.name,p.position,t.name as team_name
    //   FROM players p
    //   INNER JOIN player_teams pt
    //   ON p.id = pt.player_id
    //   INNER JOIN teams t
    //   ON pt.team_id = t.id
    //   INNER JOIN competitions c
    //   ON t.competition_id = c.id
    //   INNER JOIN leagues l
    //   ON c.id = l.competition_id
    //   WHERE l.id = ?
    // `,
    //   league_id
    // )

    return res.json(req.query)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
