import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile ,Paper, Typography } from '@material-ui/core';
import { getHistory } from '@store/accessors';
import { formatDataBasic } from '@logic/date.logic';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '1em'
  },
  list: {
    height: '93%',
    overflowY: 'scroll'
  },
  log: {
    padding: '0.5em',
    marginBottom: '0.5em'
  }
})); 

const HistoryView = ({ store }) => {
  const classes = useStyles();
  const history = getHistory(store, 25);

  return (
    <Paper className={classes.container}>
      <Typography variant="subtitle1">History Log</Typography>
      <div className={classes.list}>
        {history && history.map(log => (
          <Paper key={log.activityDate} className={classes.log}>
            <Typography variant="subtitle2">{log.title}</Typography>
            <Typography variant="subtitle2">{log.description}</Typography>
            <Typography variant="subtitle2">{formatDataBasic(log.activityDate)}</Typography>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}

export default HistoryView;