import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import HistoryLogItem from '@skills/components/HistoryLogItem';
import getHistory from '@skills/utils/getHistory';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    padding: '0.5em',
    overflowY: 'auto'
  }
})); 

const HistoryView = ({ skills }) => {
  const classes = useStyles();
  const history = getHistory(skills, 25);

  return (
    <div className={classes.container}>
      {history && history.map(log => (
        <HistoryLogItem key={log.activityDate} log={log} />
      ))}
    </div>
  );
}

export default HistoryView;