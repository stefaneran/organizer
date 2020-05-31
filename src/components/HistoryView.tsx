import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import HistoryLogItem from '@components/HistoryLogItem';
import { getHistory } from '@store/accessors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    padding: '0.5em'
  },
  historyHeader: {
    padding: '0.7em',
    marginBottom: '1em',
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  list: {
    height: '93%',
    overflowY: 'auto'
  }
})); 

const HistoryView = ({ store }) => {
  const classes = useStyles();
  const history = getHistory(store, 25);

  return (
    <div className={classes.container}>
      <Paper className={classes.historyHeader}>
        <Typography variant="h5">History Log</Typography>
      </Paper>
      <div className={classes.list}>
        {history && history.map(log => (
          <HistoryLogItem log={log} />
        ))}
      </div>
    </div>
  );
}

export default HistoryView;