import React, { Fragment, useState } from "react"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"

// Destructure props
const Confirm = ({ handleNext, handleBack, values }) => {
  const { leagueName, competition, numberOfPlayers, budget, start_date, end_date, transferWindow, maxPlayersOneClub, minOpenBid, minIncrement, subPoints, GK60Mins, GK3060Mins, GK30Mins, GKGoal, GKAssist, GKCleanSheet, GK2Con, GKYC, GKRC, GKW, GKD, GKNoPick, GKPKSave, GKOG, DF60Mins, DF3060Mins, DF30Mins, DFGoal, DFAssist, DFCleanSheet, DF2Con, DFYC, DFRC, DFW, DFD, DFNoPick, DFPKMiss, DFOG, MF60Mins, MF3060Mins, MF30Mins, MFGoal, MFAssist, MFCleanSheet, MF2Con, MFYC, MFRC, MFW, MFD, MFNoPick, MFPKMiss, MFOG, ST60Mins, ST3060Mins, ST30Mins, STGoal, STAssist, STYC, STRC, STW, STD, STNoPick, STPKMiss, STOG  } = values
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
//   const handleSubmit = () => {
//     // Do whatever with the values
//     console.log(values)
//     // Show last compinent or success message
//   }

  async function submitLeague(e) {
        console.log(values)
        setSubmitting(true)
        setResult('')
        e.preventDefault()
        try {
          const res = await fetch('/api/create-league', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              leagueName: leagueName.value,
              competition: competition.value,
              numberOfPlayers: numberOfPlayers.value,
              budget: budget.value,
              start_date: start_date.value,
              end_date: end_date.value,
              transferWindow: transferWindow.value,
              maxPlayersOneClub: maxPlayersOneClub.value,
              minOpenBid: minOpenBid.value,
              minIncrement: minIncrement.value,
              subPoints: subPoints
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

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ListItemText primary="League Name" secondary={leagueName} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Competition" secondary={competition} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Number of Players" secondary={numberOfPlayers} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Budget" secondary={budget} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Auction Start Date" secondary={start_date} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Initial Auction End Date" secondary={end_date} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Transfer Window Funds" secondary={transferWindow} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Max Players From One Club" secondary={maxPlayersOneClub} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Minimum Opening Bid" secondary={minOpenBid} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Minimum Bid Increment" secondary={minIncrement} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Percentage Points Subs Make" secondary={subPoints} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper >60 mins" secondary={GK60Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper <60 mins & >30 mins" secondary={GK3060Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper <30 mins" secondary={GK30Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Goal" secondary={GKGoal} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Assist" secondary={GKAssist} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Cleansheet" secondary={GKCleanSheet} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Conceded Goal Other Than First" secondary={GK2Con} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Yellow Card" secondary={GKYC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Red Card" secondary={GKRC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Win" secondary={GKW} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Draw" secondary={GKD} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper - None selected" secondary={GKNoPick} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Penalty Save" secondary={GKPKSave} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Goalkeeper Own Goal" secondary={GKOG} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender >60 mins" secondary={DF60Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender <60 mins & >30 mins" secondary={DF3060Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender <30 mins" secondary={DF30Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Goal" secondary={DFGoal} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Assist" secondary={DFAssist} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Cleansheet" secondary={DFCleanSheet} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Conceded Goal Other Than First" secondary={DF2Con} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Yellow Card" secondary={DFYC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Red Card" secondary={DFRC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Win" secondary={DFW} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Draw" secondary={DFD} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender - None selected" secondary={DFNoPick} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Penalty Miss" secondary={DFPKMiss} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Defender Own Goal" secondary={DFOG} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder >60 mins" secondary={MF60Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder <60 mins & >30 mins" secondary={MF3060Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder <30 mins" secondary={MF30Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Goal" secondary={MFGoal} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Assist" secondary={MFAssist} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Cleansheet" secondary={MFCleanSheet} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Conceded Goal Other Than First" secondary={MF2Con} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Yellow Card" secondary={MFYC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Red Card" secondary={MFRC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Win" secondary={MFW} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Draw" secondary={MFD} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder - None selected" secondary={MFNoPick} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Penalty Miss" secondary={MFPKMiss} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Midfielder Own Goal" secondary={MFOG} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker >60 mins" secondary={ST60Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker <60 mins & >30 mins" secondary={ST3060Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker <30 mins" secondary={ST30Mins} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Goal" secondary={STGoal} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Assist" secondary={STAssist} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Yellow Card" secondary={STYC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Red Card" secondary={STRC} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Win" secondary={STW} />
        </Grid>

        <Divider />


        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Draw" secondary={STD} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker - None selected" secondary={STNoPick} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Penalty Miss" secondary={STPKMiss} />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6}>
          <ListItemText primary="Striker Own Goal" secondary={STOG} />
        </Grid>

        <Divider />
      </Grid>

      

      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button style={{ marginLeft: 10 }} variant="contained" color="secondary" onClick={submitLeague}>
          Confirm & Continue
        </Button>
      </div>
    </Fragment>
  )
}

export default Confirm