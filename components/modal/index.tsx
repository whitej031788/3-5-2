import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    float: 'left'
  },
  close: {
    float: 'right'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FadeModal({ isOpen, setIsOpen, title, children }) {
  const classes = useStyles();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Grid item xs={8} sm={6}>
            <div className={classes.paper}>   
              <h2 id="transition-modal-title" className={classes.title}>{title}</h2>
              <IconButton edge="start" aria-label="close" className={classes.close} onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </IconButton>
              <div id="transition-modal-description">{children}</div>
            </div>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}