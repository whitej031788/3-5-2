import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInputValue from '@/components/input-value';
import AlertMessage from '@/components/alert-message';
import { usePlayerBidData } from '@/lib/swr-hooks'

export default function BidForm({ player, league_id }) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  let bid_amount = useInputValue('bid_amount');

  const currentBidData = usePlayerBidData(player.id, league_id);

  if (!currentBidData.isLoading)
    console.log(currentBidData)

  async function submitBid(e) {
    e.preventDefault()
    setSubmitting(true)
    setResult('')

    if (!bid_amount.value) {
      bid_amount.setError('Bid amount is required');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/create-bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bid_amount: bid_amount.value,
          player_id: player.id,
          league_id: league_id
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) {
        setMessage(json.message)
        setResult('error')
        throw Error(json.message)
      } else {
        // The bid was made, we have to check if it was successful
        // setMessage('You have successfully joined the league');
        // setResult('success')
      }


    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid style={{padding: "0px"}} item xs={12} sm={12}><h4>Team: {player.team_name}</h4></Grid>
        <Grid style={{padding: "0px"}} item xs={12} sm={12}><h4>Position: {player.position}</h4></Grid>
        {(result !== 'success' && !currentBidData.isError) && (
          <>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                type="number"
                id="bid_amount"
                name="bid_amount"
                label="Bid Amount"
                fullWidth
                error={bid_amount.error !== ""}
                helperText={bid_amount.error}
                {...bid_amount.bind}
              />
            </Grid>
            <Grid item xs={12}>
              <Button disabled={submitting} variant="contained" color="primary" onClick={submitBid}>
                Submit Bid
              </Button>
            </Grid>
          </>
        )}
        {/* <AlertMessage open={currentBidData.isError !== ""} message={currentBidData.isError} type={'error'} /> */}
        <AlertMessage open={result !== ""} message={message} type={result} />
      </Grid>
    </>
  );
}