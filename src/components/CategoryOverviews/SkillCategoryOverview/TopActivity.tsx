import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '1em'
  },
  header: {},
  item: {}
}));

const TopActivity = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid item className={classes.header}>
        <Typography>Top Activity: TBD</Typography>
      </Grid>
    </Paper>
  )
}

export default TopActivity;