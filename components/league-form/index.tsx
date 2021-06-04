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
import Stepper from "@material-ui/core/Stepper";
import FirstStep from "./firststep";
import SecondStep from "./secondstep";
import ThirdStep from './thirdstep';
import FourthStep from './fourthstep';
import FifthStep from './fifthstep';
import SixthStep from './sixthstep';
import Confirm from "./confirm";
import Success from "./success";
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel";
import Box from "@material-ui/core/Box"
import StepForm from "./stepform"
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { useCompetitions } from '@/lib/swr-hooks'
import Skeleton from 'react-loading-skeleton'


const labels = ["League Basics", "Advanced League Settings", "GK Settings", "DEF Settings", "MF Settings", "ST Settings", "Confirmation"]

export default function LeagueForm() {
  const initialValues = {
    leagueName: "",
    numberOfPlayers: 2,
    competition: "",
    budget: 10000000,
    transferWindow: 35000000,
    maxPlayersOneClub: 10,
    minOpenBid: 100000,
    minIncrement: 100000,
    GK60Mins: 3,
    GK3060Mins: 2,
    GK30Mins: 1,
    GKGoal: 50,
    GKAssist: 15,
    GKCleanSheet: 15,
    GK2Con: -1,
    GKYC: -1,
    GKRC: -7,
    GKW: 3,
    GKD: 1,
    GKNoPick: -5,
    GKPKSave: 25,
    GKOG: -10,
    DF60Mins: 3,
    DF3060Mins: 2,
    DF30Mins: 1,
    DFGoal: 15,
    DFAssist: 12,
    DFCleanSheet: 12,
    DF2Con: -1,
    DFYC: -1,
    DFRC: -7,
    DFW: 3,
    DFD: 1,
    DFNoPick: -5,
    DFPKMiss: -10,
    DFOG: -10,
    MF60Mins: 3,
    MF3060Mins: 2,
    MF30Mins: 1,
    MFGoal: 12,
    MFAssist: 7,
    MFCleanSheet: 5,
    MF2Con: -1,
    MFYC: -1,
    MFRC: -7,
    MFW: 3,
    MFD: 1,
    MFNoPick: -5,
    MFPKMiss: -10,
    MFOG: -10,
    ST60Mins: 3,
    ST3060Mins: 2,
    ST30Mins: 1,
    STGoal: 12,
    STAssist: 7,
    STYC: -1,
    STRC: -7,
    STW: 3,
    STD: 1,
    STNoPick: -5,
    STPKMiss: -10,
    STOG: -10
  }

  const fieldsValidation = {
    leagueName: {
      error: "",
      validate: "text",
      minLength: 2,
      maxLength: 20
    },
    numberOfPlayers: {
      error: "",
      validate: "number",
      minValue: 2,
      maxValue: 20
    },
    competition: {
      error: ""
    },
    budget: {
      error: "",
      validate: "number",
      minValue: 10000000,
      maxValue: 1000000000
    }
  }

  const [activeStep, setActiveStep] = useState(0)
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})

  const handleNext = () => setActiveStep(prev => prev + 1)
  const handleBack = () => setActiveStep(prev => prev - 1)

  const handleChange = e => {
    const { name, value } = e.target

    // Set values
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))

    // set errors
    // const error = formValidation(name, value, fieldsValidation) || ""

    // setFormErrors({
    //   [name]: error
    // })
  }

  const handleSteps = step => {
    switch (step) {
      case 0:
        return (
          <FirstStep 
            handleNext={handleNext} 
            handleChange={handleChange} 
            values={formValues} 
            formErrors={formErrors} 
          />
        )
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        )
      case 2:
        return (
          <ThirdStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        )
      case 3:
        return (
          <FourthStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        )
        case 4:
          return (
            <FifthStep
              handleNext={handleNext}
              handleBack={handleBack}
              handleChange={handleChange}
              values={formValues}
              formErrors={formErrors}
            />
          )
          case 5:
            return (
              <SixthStep
                handleNext={handleNext}
                handleBack={handleBack}
                handleChange={handleChange}
                values={formValues}
                formErrors={formErrors}
              />
            )
      case 6:
        return <Confirm handleNext={handleNext} handleBack={handleBack} values={formValues} />
      default:
        break
    }
  }

  return (
    <>
      {activeStep === labels.length ? (
        // Last Component
        <Success values={formValues} />
      ) : (
        <>
          <Box style={{ margin: "30px 0 50px" }}>
            <Typography variant="h4" align="center">
              Create A League
            </Typography>
            <Typography variant="subtitle2" align="center" style={{ margin: "10px 0" }}>
              Add a league for all your friends to join!
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} style={{ margin: "30px 0 15px" }} alternativeLabel>
            {labels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep)}
        </>
      )}
    </>
  )