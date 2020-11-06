import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '2em 1em',
    textAlign: 'center'
  },
  innerContainer: {
    height: '100%'
  },
  icon: {
    width: '35%',
    height: '100%'
  }
}));

const EmptyThumbnail = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid className={classes.innerContainer} container direction="column" justify="space-around">
        <Grid item>
          <Typography variant="h2">New</Typography>
        </Grid>
        <Grid item>
          <AddCircleOutlineIcon className={classes.icon} />
        </Grid>
        <Grid item>
          <Typography variant="h2">Category</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default EmptyThumbnail;