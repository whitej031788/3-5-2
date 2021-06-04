import React from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructuring props
export default function ThirdStep({ handleNext, handleBack, handleChange, values: { GK60Mins, GK3060Mins, GK30Mins, GKGoal, GKAssist, GKCleanSheet, GK2Con, GKYC, GKRC, GKW, GKD, GKNoPick, GKPKSave, GKOG }, formErrors }) {
    const isValid = GK60Mins >= 0
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for >60 mins"
            name="GK60Mins"
            placeholder=""
            value={GK60Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GK60Mins}
            helperText={formErrors.GK60Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <60 mins & >30 mins"
            name="GK3060Mins"
            placeholder=""
            value={GK3060Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GK3060Mins}
            helperText={formErrors.GK3060Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <30 mins"
            name="GK30Mins"
            placeholder=""
            value={GK30Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GK30Mins}
            helperText={formErrors.GK30Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Scored a goal"
            name="GKGoal"
            placeholder=""
            value={GKGoal || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKGoal}
            helperText={formErrors.GKGoal}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Assisted a goal"
            name="GKAssist"
            placeholder=""
            value={GKAssist || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKAssist}
            helperText={formErrors.GKAssist}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Clean Sheet"
            name="GKCleanSheet"
            placeholder=""
            value={GKCleanSheet || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKCleanSheet}
            helperText={formErrors.GKCleanSheet}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Every goal conceded after first"
            name="GK2Con"
            placeholder=""
            value={GK2Con || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GK2Con}
            helperText={formErrors.GK2Con}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Yellow Card"
            name="GKYC"
            placeholder=""
            value={GKYC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKYC}
            helperText={formErrors.GKYC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Red Card"
            name="GKRC"
            placeholder=""
            value={GKRC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKRC}
            helperText={formErrors.GKRC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Win (>60 mins played)"
            name="GKW"
            placeholder=""
            value={GKW || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKW}
            helperText={formErrors.GKW}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Draw (>60 mins played)"
            name="GKD"
            placeholder=""
            value={GKD || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKD}
            helperText={formErrors.GKD}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Empty Spot"
            name="GKNoPick"
            placeholder=""
            value={GKNoPick || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKNoPick}
            helperText={formErrors.GKNoPick}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Penalty Save"
            name="GKPKSave"
            placeholder=""
            value={GKPKSave || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKPKSave}
            helperText={formErrors.GKPKSave}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Own Goal"
            name="GKOG"
            placeholder=""
            value={GKOG || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.GKOG}
            helperText={formErrors.GKOG}
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