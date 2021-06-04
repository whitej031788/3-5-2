import React from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructuring props
export default function FourthStep({ handleNext, handleBack, handleChange, values: { MF60Mins, MF3060Mins, MF30Mins, MFGoal, MFAssist, MFCleanSheet, MF2Con, MFYC, MFRC, MFW, MFD, MFNoPick, MFPKMiss, MFOG }, formErrors }) {
    const isValid = MF60Mins >= 0
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for >60 mins"
            name="MF60Mins"
            placeholder=""
            value={MF60Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MF60Mins}
            helperText={formErrors.MF60Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <60 mins & >30 mins"
            name="MF3060Mins"
            placeholder=""
            value={MF3060Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MF3060Mins}
            helperText={formErrors.MF3060Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <30 mins"
            name="MF30Mins"
            placeholder=""
            value={MF30Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MF30Mins}
            helperText={formErrors.MF30Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Scored a goal"
            name="MFGoal"
            placeholder=""
            value={MFGoal || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFGoal}
            helperText={formErrors.MFGoal}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Assisted a goal"
            name="MFAssist"
            placeholder=""
            value={MFAssist || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFAssist}
            helperText={formErrors.MFAssist}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Clean Sheet"
            name="MFCleanSheet"
            placeholder=""
            value={MFCleanSheet || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFCleanSheet}
            helperText={formErrors.MFCleanSheet}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Every goal conceded after first"
            name="MF2Con"
            placeholder=""
            value={MF2Con || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MF2Con}
            helperText={formErrors.MF2Con}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Yellow Card"
            name="MFYC"
            placeholder=""
            value={MFYC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFYC}
            helperText={formErrors.MFYC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Red Card"
            name="MFRC"
            placeholder=""
            value={MFRC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFRC}
            helperText={formErrors.MFRC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Win (>60 mins played)"
            name="MFW"
            placeholder=""
            value={MFW || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFW}
            helperText={formErrors.MFW}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Draw (>60 mins played)"
            name="MFD"
            placeholder=""
            value={MFD || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFD}
            helperText={formErrors.MFD}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Empty Spot"
            name="MFNoPick"
            placeholder=""
            value={MFNoPick || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFNoPick}
            helperText={formErrors.MFNoPick}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Penalty Miss"
            name="MFPKMiss"
            placeholder=""
            value={MFPKMiss || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFPKMiss}
            helperText={formErrors.MFPKMiss}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Own Goal"
            name="MFOG"
            placeholder=""
            value={MFOG || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.MFOG}
            helperText={formErrors.MFOG}
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