import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '1em'
  },
  title: {},
  level: {},
  topActivity: {}
}));

const GeneralInfo = ({ title, rank, lastActivity }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid container direction="column" justify="space-between">
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.level}>
            Level: {rank.title}
          </Typography>
        </Grid>
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.topActivity}>
            Last Activity: {lastActivity}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default GeneralInfo;