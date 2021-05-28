import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    margin: '10px',
    textAlign: 'center'
  },
}));

export default function AlertMessage({ open, type, message }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {open && <Alert className="text-center" severity={type || 'success'}>{message}</Alert>}
    </div>
  );
}