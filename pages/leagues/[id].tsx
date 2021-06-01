import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useLeague, usePlayers } from '@/lib/swr-hooks'
import {Box, Button, Container, Grid, Paper, Table, TableContainer, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core'
import Nav from '@/components/nav'
import Skeleton from 'react-loading-skeleton'
import FadeModal from '@/components/modal'
import BidForm from '@/components/bid-form'

export default function ViewLeaguePage() {
  const router = useRouter()
  const id = router.query.id?.toString()
  const { data } = useLeague(id)
  const playerData = usePlayers(id)

  const [bidModal, setBidModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({name: '', position: '', team_name: ''});

  function setRowOpenModal(player) {
    setSelectedPlayer(player)
    setBidModal(true)
  }

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
                        <TableCell align="left">Bid</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {playerData.players.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.position}</TableCell>
                          <TableCell align="left">{row.team_name}</TableCell>
                          <TableCell align="left"><Button onClick={() => setRowOpenModal(row)} variant="contained" color="primary">Bid</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Container>
        <FadeModal isOpen={bidModal} setIsOpen={setBidModal} title={selectedPlayer.name} children={<BidForm player={ selectedPlayer } league_id={ id } />} />
      </Box>
    </div>
  )
}
