import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
  }

  const { league_id } = req.query
  try {
    if (!league_id) {
      return res.status(400).json({ message: '`league_id` required' })
    }
    if (typeof parseInt(league_id.toString()) !== 'number') {
      return res.status(400).json({ message: '`league_id` must be a number' })
    }
    const results = await query(
      `
      SELECT p.id,p.name,p.position,t.name as team_name,
      MAX(bid_amount) as max_bid, MAX(ulp.user_id) as winning_user_id
      FROM players p
      INNER JOIN player_teams pt
      ON p.id = pt.player_id
      INNER JOIN teams t
      ON pt.team_id = t.id
      INNER JOIN competitions c
      ON t.competition_id = c.id
      INNER JOIN leagues l
      ON c.id = l.competition_id
      LEFT JOIN league_bids lb
      ON lb.user_id = ? AND lb.league_id = l.id AND lb.player_id = p.id
      LEFT JOIN user_league_players ulp
      ON lb.id = ulp.league_bid_id AND lb.user_id = ulp.user_id
      WHERE l.id = ?
      GROUP BY p.id,p.name,p.position,t.name
    `,
      [session.user.id, league_id.toString()]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
