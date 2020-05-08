import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  progressBarContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  progressBar: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    backgroundColor: theme.palette.secondary.main
  }
}));

const VerticalProgressBar = ({ current, max }) => {
  const classes = useStyles(undefined);
  const ratio = current / max;
  const progress = ratio >= 1 ? 100 : Math.round(current / max * 100);
  return (
    <Paper className={classes.progressBarContainer}>
      <Paper className={classes.progressBar} style={{ height: `${progress}%` }} />
    </Paper>
  )
}

export default VerticalProgressBar;