import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'
import { getSession } from 'next-auth/client'
import { InsertResult } from '../../interfaces/QueryResults'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
  }

  try {
    const { name, max_players, start_date, competition_id } = req.body

    if (!name) {
      return res
        .status(400)
        .json({ message: '`name` is required' })
    }

    const join_code = guid();

    const results = await query(
      `
      INSERT INTO leagues (user_id, competition_id, name, max_players, start_date, join_code)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [session.user.id, competition_id, filter.clean(name), 
        max_players || null, new Date(start_date), join_code
      ]
    ) as InsertResult

    const second = await query(
      `
      INSERT IGNORE INTO user_leagues (user_id, league_id)
      VALUES (?, ?)
      `,
      [session.user.id, results.insertId]
    )

    return res.json({"code": join_code})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default handler
