import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Fab
} from "@material-ui/core";
import { Home, KeyboardArrowUp } from "@material-ui/icons";
import * as React from "react";
import HideOnScroll from "./hide-on-scroll";
import SideDrawer from "./side-drawer";
import BackToTop from "./back-to-top";
import Link from 'next/link';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    height: '65px',
    justifyContent: `space-between`
  },
  navListDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  },
  spanLogo: {
    verticalAlign: 'bottom',
    marginLeft: '10px'
  }
});

const navLinks = [
  { title: `about us`, path: `/about-us` },
  { title: `contact`, path: `/contact` },
  { title: `faq`, path: `/faq` },
  { title: `login`, path: `/login` }
];

export default function Nav() {
  const classes = useStyles();

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar component="nav">
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <IconButton edge="start" aria-label="home">
                <Link href="/">
                  <a style={{ color: `white` }}>
                    <Home fontSize="large" />
                    <span className={classes.spanLogo}>3-5-2</span>
                  </a>
                </Link>
              </IconButton>

              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navListDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <Link href={path} key={title}>
                      <a className={classes.linkText}>
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </a>
                    </Link>
                  ))}
                </List>
              </Hidden>
              <Hidden mdUp>
                <SideDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />

      <BackToTop>
        <Fab color="secondary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};
