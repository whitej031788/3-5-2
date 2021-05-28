import * as React from "react";
import { Zoom, useScrollTrigger } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const style = {
  position: `fixed`,
  bottom: `50px`,
  right: `100px`,
  zIndex: `99`
};

const useStyles = makeStyles({
  zoom: {
    position: `fixed`,
    bottom: `50px`,
    right: `100px`,
    zIndex: 99
  }
});

export default function BackToTop({ children }) {
  const trigger = useScrollTrigger();
  const classes = useStyles();

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.zoom}>
        {children}
      </div>
    </Zoom>
  );
};
