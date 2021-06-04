import React,{ useEffect, useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl"
import Typography from '@material-ui/core/Typography';
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

export default function FirstStep({handleNext, handleChange, formErrors, values: { leagueName, numberOfPlayers, budget }}) {

    const isValid =
    leagueName.length > 0 &&
    !formErrors.firstName

    const compData = useCompetitions();

    let compItems = compData.isLoading ? null : compData.competitions.map((comp) => (
        <MenuItem value={comp.id} key={comp.id}>{comp.name}</MenuItem>
    ))

    useEffect(() => {
        start_date.setValue(new Date().toISOString().substring(0, 10));
        end_date.setValue(new Date().toISOString().substring(0, 10));
    }, []);

    // currently these 3 variables aren't be stored in the values stuff which is used to show the confirmation screen
    let competition = useInputValue('competition');
    let start_date = useInputValue('start_date');
    let end_date = useInputValue('end_date')

//   if (compData.isLoading) {
//     return (<Skeleton />)
//   } else
    return (
        <Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="League Name"
                name="leagueName"
                placeholder="League Name"
                margin="normal"
                value={leagueName || ""}
                onChange={handleChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <InputLabel id="competition-id-label">Competition</InputLabel>
                <Select
                labelId="competition-id-label"
                id="competition"
                name="competition"
                fullWidth
                value={competition || ""}
                error={competition.error !== ""}
                onChange={handleChange}
                {...competition.bind}
                >
                {compItems}
                </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Number of Users"
                name="numberOfPlayers"
                placeholder="How Many Users Can Join Your League?"
                value={numberOfPlayers || ""}
                onChange={handleChange}
                error={!!formErrors.numberOfPlayers}
                helperText={formErrors.numberOfPlayers}
                type="number"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                id="budget"
                name="budget"
                label="Starting Funds"
                type="number"
                value={budget || ""}
                onChange={handleChange}
                {...budget.bind}
                />
              </Grid>
            <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker id="start_date" name="start_date" label="Auction Start Date" value={start_date.value} onChange={(e) => start_date.setValue(e.toISOString().substring(0, 10))} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker id="end_date" name="end_date" label="Initial Auction End Date" value={end_date.value} onChange={(e) => end_date.setValue(e.toISOString().substring(0, 10))} />
                </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
            <Button variant="contained" disabled={!isValid} color="primary" onClick={isValid ? handleNext : null}>
              Next
            </Button>
          </div>
        </Fragment>
      )
}
