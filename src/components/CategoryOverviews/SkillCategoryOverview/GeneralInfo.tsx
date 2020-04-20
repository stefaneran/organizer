import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import { getWeekHourGoalProgress } from '@logic/date.logic';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '1em'
  },
  title: {},
  level: {},
  topActivity: {}
}));

const GeneralInfo = ({ skill, rank }) => {
  const classes = useStyles();

  const { title, weekHourGoal, lastActivity } = skill;
  const weekHourProgress = getWeekHourGoalProgress(skill);

  return (
    <Paper className={classes.container}>
      <Grid container direction="column" justify="space-between">
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.title}>
            {title || "Error: No Title"}
          </Typography>
        </Grid>
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.level}>
            Level: {rank.title}
          </Typography>
        </Grid>
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.level}>
            Week Goal: {`${weekHourProgress} / ${weekHourGoal} hours done`}
          </Typography>
        </Grid>
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.topActivity}>
            Last Activity: {lastActivity || "Error: No Activity"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default GeneralInfo;