import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInputValue from '@/components/input-value';
import AlertMessage from '@/components/alert-message';
import { usePlayerBidData } from '@/lib/swr-hooks';
import { makeStyles } from '@material-ui/core/styles';
import CountdownTimer from '@/components/countdown-timer'
import Skeleton from 'react-loading-skeleton';
import { ThumbUp, ThumbDown } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  noYpadding: {
    paddingTop: "0px",
    paddingBottom: "0px",
    marginTop: "0px",
    marginBottom: "0px"
  },
  greenIcon: {
    color: 'green'
  },
  redIcon: {
    color: 'red'
  }
}));

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export default function BidForm({ player, league_id, updatePlayer }) {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [minBid, setMinBid] = useState(100000);
  const [bidRequestComplete, setBidRequestComplete] = useState(false);
  let bid_amount = useInputValue('bid_amount');

  const currentBidData = usePlayerBidData(player.id, league_id);

  async function submitBid(e) {
    e.preventDefault()
    setSubmitting(true)
    setResult('')

    if (!bid_amount.value) {
      bid_amount.setError('Bid amount is required');
      setSubmitting(false);
      return;
    }

    if (parseInt(bid_amount.value) < minBid) {
      bid_amount.setError('Bid amount must be at least ' + minBid);
      setSubmitting(false);
      return;
    }

    if (parseInt(bid_amount.value) % 100000 !== 0) {
      bid_amount.setError('Bid amount must be a multiple of 100k');
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
      } else {
        setBidRequestComplete(true)
        //The bid was made, we have to check if it was successful
        if (json.bidSuccess) {
          updatePlayer(mutatePlayer(bid_amount, true))
          setMessage('Your bid was successful! You are currently the leading bidder.');
          setResult('success')
        } else {
          updatePlayer(mutatePlayer(bid_amount, false))
          setMessage('Your bid failed. You need to now wait 15 minutes to attempt to bid again.');
          setResult('error')
        }
      }
    } catch (e) {
      throw Error(e.message)
    }
  }

  function mutatePlayer(bid_amount, success) {
    return {id: player.id, name: player.name, position: player.position, team_name: player.team_name, winning_user_id: success, max_bid: bid_amount};
  }

  let openBidError = null

  if (currentBidData.isError) {
    if (currentBidData.isError.message.code == "minlimit") {
      let dateFrom = addMinutes(new Date(currentBidData.isError.message.data.bid_date), 15)
      openBidError = (
        <>
          <p>{currentBidData.isError.message.message}</p>
          <CountdownTimer
            dateFromCalc={dateFrom} 
            dateFromShow={new Date(currentBidData.isError.message.data.bid_date)} 
            dateFromText={`Last Bid: `} 
            dateToText={`Next Bid: `} 
          />
        </>
      );
    } else {
      openBidError = (<span>{currentBidData.isError.message.message}</span>)
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid className={classes.noYpadding} item xs={12} sm={12}><h4 className={classes.noYpadding}>Team: {player.team_name}</h4></Grid>
        <Grid className={classes.noYpadding} item xs={12} sm={12}><h4 className={classes.noYpadding}>Position: {player.position}</h4></Grid>
        {(currentBidData && !currentBidData.isError && !currentBidData.isLoading) && (
          <>
            <Grid className={classes.noYpadding} item xs={12} sm={12}><h4 className={classes.noYpadding}>Current Bid: {currentBidData.bidData.max_bid || '*No bid yet'}</h4></Grid>
            <Grid className={classes.noYpadding} item xs={12} sm={12}>
              <h4 className={classes.noYpadding}>
                Bid Status: {currentBidData.bidData.winning_user_id ? <ThumbUp className={classes.greenIcon} /> : <ThumbDown className={classes.redIcon} />}
              </h4>
            </Grid>
          </>
        )}
        {(result !== 'success' && !currentBidData.isError && !currentBidData.isLoading) && (
          <>
            <Grid item xs={12} sm={12}>
              <TextField
                disabled={submitting || bidRequestComplete}
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
              <Button disabled={submitting || bidRequestComplete} variant="contained" color="primary" onClick={submitBid}>
                Submit Bid
              </Button>
            </Grid>
          </>
        )}
        {currentBidData.isLoading && <Skeleton />}
        {(openBidError && !currentBidData.isLoading) &&
          <AlertMessage open={currentBidData.isError} message={openBidError} type={'warning'} />
        }
        <AlertMessage open={result !== ""} message={message} type={result} />
      </Grid>
    </>
  );
}