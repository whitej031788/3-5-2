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
    const results = await query(
      `
      SELECT l.id, l.name, c.name as competition_name FROM leagues l  
      INNER JOIN user_leagues ul ON l.id = ul.league_id
      INNER JOIN competitions c ON l.competition_id = c.id
      WHERE ul.user_id = ?
      `,
      [session.user.id]
    )

    return res.json(results)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}
export default handler
