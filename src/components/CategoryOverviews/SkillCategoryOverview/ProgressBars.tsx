import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  }
}));

const ProgressBars = ({  }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid data-selector="progress-bars" container>

      <Grid data-selector="progress-bar-hours" item>
        <LinearProgress variant="determinate" value={20} color="primary" />
      </Grid>

      <Grid data-selector="progress-bar-xp" item >
        <LinearProgress variant="determinate" value={80} color="secondary" />
      </Grid>

      </Grid>
    </Paper>
  )
}

export default ProgressBars;