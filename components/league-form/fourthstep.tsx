import React from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructuring props
export default function FourthStep({ handleNext, handleBack, handleChange, values: { DF60Mins, DF3060Mins, DF30Mins, DFGoal, DFAssist, DFCleanSheet, DF2Con, DFYC, DFRC, DFW, DFD, DFNoPick, DFPKMiss, DFOG }, formErrors }) {
    const isValid = DF60Mins >= 0
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for >60 mins"
            name="DF60Mins"
            placeholder=""
            value={DF60Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DF60Mins}
            helperText={formErrors.DF60Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <60 mins & >30 mins"
            name="DF3060Mins"
            placeholder=""
            value={DF3060Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DF3060Mins}
            helperText={formErrors.DF3060Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <30 mins"
            name="DF30Mins"
            placeholder=""
            value={DF30Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DF30Mins}
            helperText={formErrors.DF30Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Scored a goal"
            name="DFGoal"
            placeholder=""
            value={DFGoal || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFGoal}
            helperText={formErrors.DFGoal}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Assisted a goal"
            name="DFAssist"
            placeholder=""
            value={DFAssist || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFAssist}
            helperText={formErrors.DFAssist}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Clean Sheet"
            name="DFCleanSheet"
            placeholder=""
            value={DFCleanSheet || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFCleanSheet}
            helperText={formErrors.DFCleanSheet}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Every goal conceded after first"
            name="DF2Con"
            placeholder=""
            value={DF2Con || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DF2Con}
            helperText={formErrors.DF2Con}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Yellow Card"
            name="DFYC"
            placeholder=""
            value={DFYC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFYC}
            helperText={formErrors.DFYC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Red Card"
            name="DFRC"
            placeholder=""
            value={DFRC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFRC}
            helperText={formErrors.DFRC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Win (>60 mins played)"
            name="DFW"
            placeholder=""
            value={DFW || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFW}
            helperText={formErrors.DFW}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Draw (>60 mins played)"
            name="DFD"
            placeholder=""
            value={DFD || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFD}
            helperText={formErrors.DFD}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Empty Spot"
            name="DFNoPick"
            placeholder=""
            value={DFNoPick || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFNoPick}
            helperText={formErrors.DFNoPick}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Penalty Miss"
            name="DFPKMiss"
            placeholder=""
            value={DFPKMiss || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFPKMiss}
            helperText={formErrors.DFPKMiss}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Own Goal"
            name="DFOG"
            placeholder=""
            value={DFOG || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.DFOG}
            helperText={formErrors.DFOG}
            type="number"
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