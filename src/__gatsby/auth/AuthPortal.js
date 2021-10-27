//* Potential Problem: Utilizing window below...

import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import Login from './Login'
import SignUp from './SignUp'
import Complete from './Complete'
import Reset from './Reset'
import { UserContext, FeedbackContext } from '../../contexts'
import { setUser, setSnackbar } from '../../contexts/actions'

const useStyles = makeStyles(theme => ({
  paper: {
    // border: `2rem solid ${theme.palette.background.default}`,
    // border: `2rem solid ${theme.palette.primary.darker}`,
    width: '50rem',
    height: '40rem',
    borderRadius: '15px',
    [theme.breakpoints.down('md')]: {
      width: '30rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 2rem)',
      borderWidth: '1rem',
    },
  },
  inner: {
    height: '40rem',
    width: '100%',
    borderRadius: '5px',
    border: `0.5rem solid #2d3238`,
    paddingTop: '35px',
    paddingBottom: '35px',
    paddingLeft: '20px',
    paddingRight: '20px',
    // border: `2rem solid ${theme.palette.primary.light}`,
    // border: `2rem solid ${theme.palette.background.default}`,
    // border: `2rem solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('xs')]: {
      borderWidth: '1rem',
    },
  },
  container: {
    marginBottom: '8rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '5rem',
    },
  },
  '@global': {
    '.MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before':
      {
        borderBottom: `0px solid ${theme.palette.secondary.main}`,
        // borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    '.MuiInput-underline:after': {
      // borderBottom: `2px solid ${theme.palette.primary.main}`,
      borderBottom: `2px solid #1f73e8`,
    },
  },
}))

export default function AuthPortal() {
  const classes = useStyles()
  const [selectedStep, setSelectedStep] = useState(0)
  const { user, dispatchUser } = useContext(UserContext)
  const { feedback, dispatchFeedback } = useContext(FeedbackContext)

  const steps = [
    { component: Login, label: 'Login' },
    { component: SignUp, label: 'Sign Up' },
    { component: Complete, label: 'Complete' },
    { component: Reset, label: 'Reset' },
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const access_token = params.get('access_token')

    if (code) {
      const resetStep = steps.find(step => step.label === 'Reset')
      setSelectedStep(steps.indexOf(resetStep))
    } else if (access_token) {
      axios
        .get(`${process.env.GATSBY_STRAPI_URL}/auth/facebook/callback`, {
          params: { access_token },
        })
        .then(response => {
          dispatchUser(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
              onboarding: true,
            })
          )

          window.history.replaceState(null, null, window.location.pathname)
        })
        .catch(error => {
          console.error(error)
          dispatchFeedback(
            setSnackbar({
              status: 'error',
              message: 'Connecting To Facebook failed, please try again.',
            })
          )
        })
    }
  }, [])
  console.log('STEP IS as FOLLOWS: ', steps[0])

  return (
    <Grid
      container
      justifyContent="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <Paper elevation={6} classes={{ root: classes.paper }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            classes={{ root: classes.inner }}
          >
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <>
                  {Step.label}
                  {Step.component}
                  <Step.component
                    setSelectedStep={setSelectedStep}
                    steps={steps}
                    user={user}
                    dispatchUser={dispatchUser}
                    feedback={feedback}
                    dispatchFeedback={dispatchFeedback}
                    key={Step.label}
                  />
                </>
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid>
      {/* <Grid item>
        <Paper elevation={6} classes={{ root: classes.paper }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            classes={{ root: classes.inner }}
          >
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <h1>
                  Login
                  {Step.label}
                  {Step.component}
                  {console.log(
                    'INNER CONSOLE LOG OF SELECTED STEP: ',
                    Step.label
                  )}
                </h1>
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid> */}
    </Grid>
  )
}
