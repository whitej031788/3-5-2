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

    const checkIfMinutesHavePassed = await query(
      `
      SELECT MAX(created_at) as recent_bid
      FROM league_bids lb
      WHERE lb.player_id = ?
      AND lb.user_id = ?
      AND lb.league_id = ?
    `,
      [player_id, session.user.id, league_id]
    )

    if (checkIfMinutesHavePassed.length !== 0 && !hasItBeenFifteenMinutes(new Date(checkIfMinutesHavePassed[0].recent_bid))) {
      return res.status(400).json({ message: 'You have bid on this player in the last 15 minutes, please wait' })
    }

    const results = await query(
      `
      SELECT ulp.user_id, ulp.winning_bid_amount
      FROM league_bids lb
      INNER JOIN user_league_players ulp
      ON lb.id = ulp.league_bid_id
      WHERE lb.league_id = ?
      AND lb.player_id = ?
    `,
      [league_id, player_id]
    )

    return res.json(results)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

function hasItBeenFifteenMinutes(date: Date): boolean {
  let currentTime = (new Date().getTime()) / 1000;
  let lastBidTime = (date.getTime()) / 1000;
  if (currentTime - lastBidTime >= 900) {
      // then more than 15 minutes elapsed.
      return true;
  } else {
    return false;
  }
}

export default handler
