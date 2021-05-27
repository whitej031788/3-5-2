import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

import { Grid, Button, AppBar, Toolbar, MenuItem, Menu} from "@material-ui/core"

export default function Nav() {
  let [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const useStyles = makeStyles({
    row:{
      flexGrow:1
    },
    grow:{
      flexGrow:1
    },
    container:{
      width:1170,
      margin:"auto"
    },
    buttonFontSize:{
      fontSize:"11px",
      color:"#a1a1a1"
    },
    AppBar:{
      //height:400,
      //background: `url("http://lorempixel.com/1920/1080/nature") no-repeat center center`,
      backgroundColor:"#fff",
      backgroundSize:"cover"
    },
    mainLogo:{
      color: "#a1a1a1",
      justifyContent:"left",
      '&:hover':{
        background:"transparent"
      }
    },
    logo:{
      height:"100%",
      borderRadius:0,
      width: "auto"
    },
    loginButton:{
      background:"#e91e63",
      color:"#fff",
      borderRadius:"25px",
      padding:"0px 25px",
      '&:hover':{
        background: 'blue',
        boxShadow: "0px 2px 10px #888888"
      }
    }
  });

  const classes = useStyles();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.AppBar}>
        <Grid item sm={12} xs={12} className={classes.container}>
          <Toolbar>
            <Grid className={classes.grow}>
              <Button className={classes.mainLogo}>
                <Image src="/images/logo200x200.png" className={classes.logo} alt="3-5-2" layout="fill" />
              </Button>
            </Grid>
            <Button color="inherit" onClick={handleMenu} className={classes.buttonFontSize}>Discover</Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
            <Button color="inherit" className={classes.buttonFontSize}>Profile</Button>
            <Button color="inherit" className={classes.buttonFontSize,classes.loginButton}>Login</Button>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  )
}
