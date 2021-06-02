import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useLeague, usePlayers } from '@/lib/swr-hooks'
import {Box, Button, Container, Grid, Paper, Table, TableContainer, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core'
import Nav from '@/components/nav'
import Skeleton from 'react-loading-skeleton';
import FadeModal from '@/components/modal'
import BidForm from '@/components/bid-form'
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  greenIcon: {
    color: 'green'
  },
  redIcon: {
    color: 'red'
  }
}));

export default function ViewLeaguePage() {
  const router = useRouter()
  const classes = useStyles()
  const id = router.query.id?.toString()
  const [isAlreadyAlerted, setIsAlreadyAlerted] = useState(false)

  let leagueData = useLeague(id)
  let playerData = usePlayers(id)

  const [bidModal, setBidModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({name: '', position: '', team_name: '', max_bid: '', winning_user_id: null});

  function setRowOpenModal(player) {
    setSelectedPlayer(player)
    setBidModal(true)
  }

  if (!leagueData.isLoading && leagueData.isError) {
    if (!isAlreadyAlerted) {
        setIsAlreadyAlerted(true)
        alert('There was an issue loading this league, please make sure you have navigates to this page properly. Sending you back to leagues')
        router.push('/leagues')
    }
    return (<></>)
  } else if (!leagueData.isLoading && !leagueData.isError) {
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
                          <TableCell align="left">Player</TableCell>
                          <TableCell align="left">Position</TableCell>
                          <TableCell align="left">Team</TableCell>
                          <TableCell align="left">Current Bid</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Bid</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {playerData.players.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.position}</TableCell>
                            <TableCell align="left">{row.team_name}</TableCell>
                            <TableCell align="left">{row.max_bid}</TableCell>
                            <TableCell align="left">{row.winning_user_id ? <ThumbUp className={classes.greenIcon} /> : <ThumbDown className={classes.redIcon} />}</TableCell>
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
          <FadeModal isOpen={bidModal} setIsOpen={setBidModal} title={selectedPlayer.name} children={<BidForm player={ selectedPlayer } league_id={ id } updatePlayer={setSelectedPlayer} />} />
        </Box>
      </div>
    )
  } else {
    return (<Skeleton />)
  }
}
