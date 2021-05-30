import React,{ useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import useInputValue from '@/components/input-value';
import AlertMessage from '@/components/alert-message';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { useCompetitions } from '@/lib/swr-hooks'
import Skeleton from 'react-loading-skeleton'

export default function LeagueForm() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');


  let name = useInputValue('name');
  let max_players = useInputValue('max_players');
  let start_date = useInputValue('start_date');
  let competition = useInputValue('competition');

  const compData = useCompetitions();

  useEffect(() => {
    start_date.setValue(new Date().toISOString().substring(0, 10));
  }, []);

  async function submitLeague(e) {
    setSubmitting(true)
    setResult('')
    if (!name.value) {
      name.setError('Name is required');
      setSubmitting(false);
      return;
    }
    if (!competition.value) {
      competition.setError('Competition is required');
      setSubmitting(false);
      return;
    }
    e.preventDefault()
    try {
      const res = await fetch('/api/create-league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          start_date: start_date.value,
          max_players: parseInt(max_players.value),
          competition_id: competition.value
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) {
        setMessage(json.message)
        setResult('error')
        throw Error(json.message)
      } else {
        setMessage('Your league has bee created. Share join code: ' + json.code + ' with anyone you want to join your league');
        setResult('success')
      }

    } catch (e) {
      throw Error(e.message)
    }
  }

  let compItems = compData.isLoading ? null : compData.competitions.map((comp) => (
    <MenuItem value={comp.id} key={comp.id}>{comp.name}</MenuItem>
  ))
  
  if (compData.isLoading) {
    return (<Skeleton />)
  } else {
    return (
      <>
        <Grid container spacing={3}>
          {result !== 'success' && (
            <>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="League Name"
                  fullWidth
                  error={name.error !== ""}
                  helperText={name.error}
                  {...name.bind}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="competition-id-label">Competition *</InputLabel>
                <Select
                  required
                  labelId="competition-id-label"
                  id="competition"
                  name="competition"
                  fullWidth
                  error={competition.error !== ""}
                  {...competition.bind}
                >
                  {compItems}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="max_players"
                  name="max_players"
                  label="Max Players"
                  type="number"
                  fullWidth
                  {...max_players.bind}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker id="start_date" name="start_date" value={start_date.value} onChange={(e) => start_date.setValue(e.toISOString().substring(0, 10))} />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <Button disabled={submitting} variant="contained" color="primary" onClick={submitLeague}>
                  Create
                </Button>
              </Grid>
            </>
          )}
          <AlertMessage open={result !== ""} message={message} type={result} />
        </Grid>
      </>
    );
  }
}