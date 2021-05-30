import React, { useState } from 'react';
import Nav from '@/components/nav';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, Button, TextField } from '@material-ui/core';
import { signIn, getSession } from 'next-auth/client';
import useInputValue from '@/components/input-value';
import AlertMessage from '@/components/alert-message';

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
    maxWidth: '600px',
    textAlign: 'center',
    padding: '20px'
  },
  button: {
    marginTop: '10px'
  }
}));

export default function LoginPage({ session }) {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  let email = useInputValue('email');

  function handleAuthLogin() {
    setMessage('');
    setSuccess(false);
    signIn('email', { redirect: false, email: email.value })
    .then(result => {
      setSuccess(true);
      if (!result.error) {
        setMessageType('success');
        setMessage('We have sent you an email, please check it to login');
      } else {
        setMessageType('error');
        setMessage('There was an issue sending verification, please check your email and try again');
      }
    })
  }

  return (
    <div>
      <Nav isGuestRoute={true} />
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
              <h1 className="text-4xl font-bold mb-5">Sign In</h1>
              <p className="mb-5">All you need to get started is your email. We will send you a verification that will create your account and log you in. No need to remember a 3,476,232th password.</p>
              {(!success || messageType != 'success') &&
                <form noValidate autoComplete="off">
                    <TextField fullWidth id="email" name="email" label="Email" {...email.bind} />
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => handleAuthLogin()}>
                      Sign In
                    </Button>
                </form>
              }
              <AlertMessage open={success} type={messageType} message={message}  />
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

  if (session) {
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/home',
        permanent: false
      }
    };
  }

  // If there is a user, return the current session
  return { props: { session } };
}
