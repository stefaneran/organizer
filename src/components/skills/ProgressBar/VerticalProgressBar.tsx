import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Tooltip, TooltipProps } from '@material-ui/core';

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

interface ProgressBarProps {
  current: number;
  max: number;
  tooltip?: {
    text: string;
    placement: TooltipProps["placement"];
  };
}

const VerticalProgressBar = ({ current, max, tooltip }: ProgressBarProps) => {
  const classes = useStyles(undefined);
  const ratio = current / max;
  const progress = ratio >= 1 ? 100 : Math.round(current / max * 100);

  return (
    <>
      {tooltip ? (
        <Tooltip title={tooltip.text} placement={tooltip.placement}>
          <Paper className={classes.progressBarContainer}>
            <Paper className={classes.progressBar} style={{ height: `${progress}%` }} />
          </Paper>
        </Tooltip>
      ) : (
        <Paper className={classes.progressBarContainer}>
          <Paper className={classes.progressBar} style={{ height: `${progress}%` }} />
        </Paper>
      )}
    </>
  )
}

export default VerticalProgressBar;