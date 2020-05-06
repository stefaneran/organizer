import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';
import { getWeekHourGoalProgress, formatDataBasic } from '@utils/dateUtils';

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
          <Typography variant="h5" className={classes.title}>
            {title || "Error: No Title"}
          </Typography>
        </Grid>
        <Divider />
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.level}>
            Level: {rank.title}
          </Typography>
        </Grid>
        <Divider />
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.level}>
            Week Goal: {`${weekHourProgress} / ${weekHourGoal} hours done`}
          </Typography>
        </Grid>
        <Divider />
        <Grid item className={'gridRow'}>
          <Typography variant="h6" className={classes.topActivity}>
            Last Activity: {formatDataBasic(lastActivity) || "Error: No Activity"}
          </Typography>
        </Grid>
        <Divider />
      </Grid>
    </Paper>
  )
}

export default GeneralInfo;