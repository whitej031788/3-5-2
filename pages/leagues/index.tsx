import React, { useState } from 'react';
import Nav from '@/components/nav';
import { Container, Box, Grid, Button, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Paper } from '@material-ui/core';
import FadeModal from '@/components/modal';
import LeagueForm from '@/components/league-form';
import JoinLeagueForm from '@/components/league-form/join';
import { useLeagues } from '@/lib/swr-hooks';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: 'pointer',
    transition: '0.1s',
    '&:hover': { 
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
  }
}));

export default function LeaguePage() {
  const [addModal, setAddModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  const leagueData = useLeagues();

  return (
    <div>
      <Nav />
      <Box mt={4}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={() => setAddModal(true)} variant="contained" color="primary">Create League</Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => setJoinModal(true)} variant="contained" color="primary">Join League</Button>
            </Grid>
            <Grid item xs={12}>
              {leagueData.isLoading && (<Skeleton />)}
              {!leagueData.isLoading && (
                <TableContainer component={Paper}>
                  <Table aria-label="League Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>League ID</TableCell>
                        <TableCell align="left">League Name</TableCell>
                        <TableCell align="left">Competition</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leagueData.leagues.map((row) => (
                        <TableRow key={row.name} className={classes.row} onClick={() => router.push('/leagues/' + row.id)}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.competition_name}</TableCell>
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
      <FadeModal isOpen={addModal} setIsOpen={setAddModal} title={`Add League`} children={<LeagueForm />} />
      <FadeModal isOpen={joinModal} setIsOpen={setJoinModal} title={`Join League`} children={<JoinLeagueForm />} />
    </div>
  )
}