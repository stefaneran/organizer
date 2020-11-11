import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { formatDateClassic, getDaysFromDate } from '@core/utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  historyLog: {
    background: theme.palette.primary.main,
    padding: '0.5em',
    marginBottom: '0.5em'
  },
  historyLogContent: {
    padding: '0.2em'
  },
  historyLogLine: {
    padding: '0.1em 0.5em'
  }
}));

const InteractionLog = ({ hangoutDate }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.historyLog}>
      <Paper className={classes.historyLogContent}>
        <Typography variant="subtitle1" className={classes.historyLogLine}>
          {`${formatDateClassic(hangoutDate)} - ${getDaysFromDate(hangoutDate)} days ago`}
        </Typography>
      </Paper>
    </Paper>
  )
}

export default InteractionLog;