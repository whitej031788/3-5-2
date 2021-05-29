import Nav from '@/components/nav';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, Button } from '@material-ui/core';
import Link from 'next/link';
import { getSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
  middleContainer: {
    minHeight: 'calc(100vh - 65px)',
    backgroundColor: 'black',
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
      <Container maxWidth="lg" className={classes.middleContainer}>
        <main>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.middleContainer}
          >
            <Card className={classes.card}>
              <h1 className="text-4xl font-bold mb-5">3-5-2</h1>
              <p className="mb-5">A fantasy football game with a twist.</p>
              <Link href="/login">
                <Button variant="contained" color="primary">
                  Get Started
                </Button>
              </Link>
            </Card>
          </Grid>
        </main>
      </Container>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Get the user's session based on the request
  const session = await getSession(context);

  if (!session) {
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  // If there is a user, return the current session
  return { props: { session } };
}
