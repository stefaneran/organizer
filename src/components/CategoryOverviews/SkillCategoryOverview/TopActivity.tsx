import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

const getTop = () => ([
  { name: 'Activity 1' },
  { name: 'Activity 2' },
  { name: 'Activity 3' }
])

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  header: {},
  item: {}
}));

const TopActivity = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid item className={classes.header}>
        <h3>Top:</h3>
      </Grid>
      {getTop().map((item, index) => (
        <Grid key={index} item className={classes.item}>
          <h3>{item.name}</h3>
        </Grid>
      ))}
    </Paper>
  )
}

export default TopActivity;