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
    const { join_code } = req.body

    if (!join_code) {
      return res
        .status(400)
        .json({ message: '`join_code` is required' })
    }

    const results = await query(
      `
      SELECT id FROM leagues WHERE join_code = ? LIMIT 1
      `,
      [join_code]
    )

    if (results.length == 0) {
      return res
        .status(400)
        .json({ message: 'Cannot find a league with that code' })
    }

    const second = await query(
      `
      INSERT IGNORE INTO user_leagues (user_id, league_id)
      VALUES (?, ?)
      `,
      [session.user.id, results[0].id]
    )

    return res.json(results)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}
export default handler
