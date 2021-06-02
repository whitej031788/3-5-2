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
      SELECT MAX(lb.created_at) as recent_bid, MAX(bid_amount) as max_bid, MAX(ulp.user_id) as winning_user_id
      FROM league_bids lb
      LEFT JOIN user_league_players ulp
      ON lb.id = ulp.league_bid_id AND lb.user_id = ulp.user_id
      WHERE lb.player_id = ?
      AND lb.user_id = ?
      AND lb.league_id = ?
    `,
      [parseInt(player_id.toString()), session.user.id, parseInt(league_id.toString())]
    )

    if (checkIfMinutesHavePassed.length !== 0 && !hasItBeenFifteenMinutes(new Date(checkIfMinutesHavePassed[0].recent_bid))) {
      let message = ""
      if (checkIfMinutesHavePassed[0].winning_user_id == session.user.id) {
        message = "You are already WINNING this auction with a bid of " + checkIfMinutesHavePassed[0].max_bid + ". You still have to wait 15 minutes since your last bid though."
      } else {
        message = "You have to wait 15 minutes since your last bid. You highest failed bid to date is for " + checkIfMinutesHavePassed[0].max_bid + "."
      }
      return res.status(400).json({ 
        message: message, 
        code: 'minlimit', 
        data: {bid_date: new Date(checkIfMinutesHavePassed[0].recent_bid), bid_amount: checkIfMinutesHavePassed[0].max_bid}
      })
    }

    return res.json(checkIfMinutesHavePassed[0])
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
