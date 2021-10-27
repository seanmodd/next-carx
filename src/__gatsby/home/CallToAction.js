//! This is the opening page
//! must check there is a link here
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button'
import { Button } from '@mui/material';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import cta from '../../images/cta.svg';

const useStyles = makeStyles((theme) => ({
  account: {
    color: '#fff',
    marginLeft: '2rem',
  },
  body: {
    maxWidth: '45rem',
    [theme.breakpoints.down('md')]: {
      padding: '0 1rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  container: {
    marginBottom: '15rem',
  },
  buttonContainer: {
    marginTop: '3rem',
  },
  headingContainer: {
    marginTop: '10rem',
    [theme.breakpoints.down('md')]: {
      padding: '0 1rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  icon: {
    [theme.breakpoints.down('xs')]: {
      height: '18rem',
      width: '20rem',
    },
  },
}));

export default function CallToAction() {
  const classes = useStyles();
  const matchesMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      classes={{ root: classes.container }}
      direction={matchesMD ? 'column' : 'row'}
    >
      {/* <Grid item>
        <img src={cta} className={classes.icon} alt="quality committed" />
      </Grid> */}
      <Grid item>
        <Grid container direction="column">
          <Grid item classes={{ root: classes.headingContainer }}>
            <Typography
              // style={{ letterSpacing: '-6px' }}
              align={matchesMD ? 'center' : undefined}
              variant="h1"
            >
              The Online Car Dealer <br />
              That Works For You
            </Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography
              align={matchesMD ? 'center' : undefined}
              variant="body1"
            >
              At CarX our mission is to provide you with the car shopping
              experience you deserve.
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={matchesMD ? 'center' : undefined}
            classes={{ root: classes.buttonContainer }}
          >
            <Grid item>
              {/* <Button
                component={Link}
                href="/dashboard/contact"
                variant="outlined"
                color="primary"
              >
                Contact Us
              </Button> */}
            </Grid>
            <Grid style={{ marginLeft: '25px' }} item>
              {/* <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/dashboard/account"
                classes={{ root: classes.account }}
              >
                Create Account
              </Button> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
