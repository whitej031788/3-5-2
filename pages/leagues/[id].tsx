import { useRouter } from 'next/router'

import { useLeague, usePlayers } from '@/lib/swr-hooks'
import {Box, Container, Grid, Paper, Table, TableContainer, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core'
import Nav from '@/components/nav'
import Skeleton from 'react-loading-skeleton'

export default function ViewLeaguePage() {
  const router = useRouter()
  const id = router.query.id?.toString()
  const { data } = useLeague(id)
  const playerData = usePlayers(id)

  return (
    <div>
      <Nav />
      <Box mt={4}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {playerData.isLoading && (<Skeleton />)}
              {!playerData.isLoading && (
                <TableContainer component={Paper}>
                  <Table aria-label="League Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Player ID</TableCell>
                        <TableCell align="left">Player Name</TableCell>
                        <TableCell align="left">Position</TableCell>
                        <TableCell align="left">Team Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {playerData.players.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.position}</TableCell>
                          <TableCell align="left">{row.team_name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
