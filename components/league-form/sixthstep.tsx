import React from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructuring props
export default function FourthStep({ handleNext, handleBack, handleChange, values: { ST60Mins, ST3060Mins, ST30Mins, STGoal, STAssist, STYC, STRC, STW, STD, STNoPick, STPKMiss, STOG }, formErrors }) {
    const isValid = ST60Mins >= 0
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for >60 mins"
            name="ST60Mins"
            placeholder=""
            value={ST60Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.ST60Mins}
            helperText={formErrors.ST60Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <60 mins & >30 mins"
            name="ST3060Mins"
            placeholder=""
            value={ST3060Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.ST3060Mins}
            helperText={formErrors.ST3060Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Played for <30 mins"
            name="ST30Mins"
            placeholder=""
            value={ST30Mins || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.ST30Mins}
            helperText={formErrors.ST30Mins}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Scored a goal"
            name="STGoal"
            placeholder=""
            value={STGoal || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STGoal}
            helperText={formErrors.STGoal}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Assisted a goal"
            name="STAssist"
            placeholder=""
            value={STAssist || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STAssist}
            helperText={formErrors.STAssist}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Yellow Card"
            name="STYC"
            placeholder=""
            value={STYC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STYC}
            helperText={formErrors.STYC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Red Card"
            name="STRC"
            placeholder=""
            value={STRC || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STRC}
            helperText={formErrors.STRC}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Win (>60 mins played)"
            name="STW"
            placeholder=""
            value={STW || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STW}
            helperText={formErrors.STW}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Draw (>60 mins played)"
            name="STD"
            placeholder=""
            value={STD || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STD}
            helperText={formErrors.STD}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Empty Spot"
            name="STNoPick"
            placeholder=""
            value={STNoPick || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STNoPick}
            helperText={formErrors.STNoPick}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Penalty Miss"
            name="STPKMiss"
            placeholder=""
            value={STPKMiss || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STPKMiss}
            helperText={formErrors.STPKMiss}
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Own Goal"
            name="STOG"
            placeholder=""
            value={STOG || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.STOG}
            helperText={formErrors.STOG}
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