import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'
import { getSession } from 'next-auth/client'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
  }

  try {
    const { bid_amount, player_id, league_id } = req.body

    if (!bid_amount) {
      return res
        .status(400)
        .json({ message: '`bid_amount` is required' })
    }

    // Check if they are in the league
    const checkPlayerLeague = await query(
      `
      SELECT * FROM user_leagues WHERE league_id = ? AND user_id = ?
      `,
      [league_id, session.user.id]
    )

    if (checkPlayerLeague.length == 0) {
      return res
        .status(400)
        .json({ message: 'You are not in this league, contact the league administrator' })
    }

    // Check bid amount
    const checkBidAmount = await query(
      `
      SELECT MAX(bid_amount) as top_bid FROM league_bids WHERE league_id = ? AND player_id = ?
      `,
      [league_id, player_id]
    )

    let bidSuccess = 0;

    // If the bid amount is more, or there isn't a bid for the player yet, this is a successful bid
    if (!checkBidAmount[0].top_bid || (bid_amount > checkBidAmount[0].top_bid)) {
      bidSuccess = 1;
    }

    const results = await query(
      `
      INSERT INTO league_bids (user_id, league_id, player_id, bid_amount, is_success)
      VALUES (?, ?, ?, ?, ?)
      `,
      [session.user.id, league_id, player_id, 
        bid_amount, bidSuccess
      ]
    )

    // if it's successful, lets upsert a row into the user_league_players table, saying the current owner
    if (bidSuccess) {
      let expires_at = new Date(); expires_at.setDate(expires_at.getDate()+1);
      const addOwner = await query(
        `
        INSERT INTO user_league_players (league_id, player_id, user_id, league_bid_id, winning_bid_amount, is_over, expires_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE league_bid_id=VALUES(league_bid_id), user_id=VALUES(user_id), winning_bid_amount=VALUES(winning_bid_amount), is_over=VALUES(is_over), expires_at=VALUES(expires_at)
        `,
        [league_id, player_id, session.user.id, results.insertId, bid_amount, 0, expires_at]
      );
    }

    return res.json(results)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

export default handler
