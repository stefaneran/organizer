import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {},
  title: {},
  level: {},
  topActivity: {}
}));

const GeneralInfo = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <h1 data-selector="skill-title" className={classes.title}>
        Title
      </h1>
      <h2 data-selector="skill-level" className={classes.level}>
        Level: {'Skilled'}
      </h2>
      <h2 data-selector="skill-last-activity" className={classes.topActivity}>
        Last Activity: {'3 Days Ago - Monday 03-04-2020 16:45'}
      </h2>
    </Paper>
  )
}

export default GeneralInfo;