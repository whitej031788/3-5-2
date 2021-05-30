import Nav from '@/components/nav';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { getSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
  middleContainer: {
    minHeight: 'calc(100vh - 65px)',
    padding: 0,
  },
  card: {
    alignItems: "center",
    backgroundColor: "white",
    minHeight: '200px',
    minWidth: '400px',
    textAlign: 'center',
    padding: '20px'
  }
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <div>
      <Nav />
      <Container maxWidth="md" className={classes.middleContainer}>
        <main>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.middleContainer}
          >
            <h1>This will be the dashboard, not sure what goes here yet</h1>
          </Grid>
        </main>
      </Container>
    </div>
  )
}