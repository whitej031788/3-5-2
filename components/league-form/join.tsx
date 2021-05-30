import React,{ useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInputValue from '@/components/input-value';
import AlertMessage from '@/components/alert-message';

export default function LeagueForm() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  let join_code = useInputValue('join_code');

  async function submitJoinLeague(e) {
    e.preventDefault()
    setSubmitting(true)
    setResult('')

    if (!join_code.value) {
      join_code.setError('Code is required');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/join-league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          join_code: join_code.value.trim()
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) {
        setMessage(json.message)
        setResult('error')
        throw Error(json.message)
      } else {
        setMessage('You have successfully joined the league');
        setResult('success')
      }


    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        {result !== 'success' && (
          <>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="join_code"
                name="join_code"
                label="League Code"
                fullWidth
                error={join_code.error !== ""}
                helperText={join_code.error}
                {...join_code.bind}
              />
            </Grid>
            <Grid item xs={12}>
              <Button disabled={submitting} variant="contained" color="primary" onClick={submitJoinLeague}>
                Join
              </Button>
            </Grid>
          </>
        )}
        <AlertMessage open={result !== ""} message={message} type={result} />
      </Grid>
    </>
  );
}