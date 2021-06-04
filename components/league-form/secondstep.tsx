import React from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructuring props
export default function SecondStep({ handleNext, handleBack, handleChange, values: { transferWindow, maxPlayersOneClub, minOpenBid, minIncrement, subPoints }, formErrors }) {
    const isValid = transferWindow >= 0
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Transfer Window Funds"
            name="transferWindow"
            placeholder="Transfer Window Funds"
            value={transferWindow || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.transferWindow}
            helperText={formErrors.transferWindow}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Max players from one club"
            name="maxPlayersOneClub"
            placeholder=""
            value={maxPlayersOneClub || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.maxPlayersOneClub}
            helperText={formErrors.maxPlayersOneClub}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Min Opening Bid"
            name="minOpenBid"
            placeholder=""
            value={minOpenBid || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.minOpenBid}
            helperText={formErrors.minOpenBid}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Min Bid Increment"
            name="minIncrement"
            placeholder=""
            value={minIncrement || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.minIncrement}
            helperText={formErrors.minIncrement}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="% Points Scored by Subs"
            name="subPoints"
            placeholder="% Points Scored by Subs"
            value={subPoints || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.subPoints}
            helperText={formErrors.subPoints}
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <Button variant="contained" color="default" onClick={handleBack} style={{ marginRight: 10 }}>
          Back
        </Button>
        <Button variant="contained" disabled={!isValid} color="primary" onClick={isValid ? handleNext : null}>
          Next
        </Button>
      </div>
    </>
  )
}