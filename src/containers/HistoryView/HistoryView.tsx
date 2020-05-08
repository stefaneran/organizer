import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';
import CategoryIcon from '@components/CategoryIcon';
import { getHistory } from '@store/accessors';
import { formatDataBasic } from '@utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    padding: '0.5em'
  },
  historyHeader: {
    padding: '0.84em 1em',
    marginBottom: '1em'
  },
  list: {
    height: '93%',
    overflowY: 'auto'
  },
  logContainer: {
    padding: '0.5em',
    marginBottom: '0.5em',
    backgroundColor: theme.palette.primary.main
  },
  logInfo: {
    padding: '0.2em'
  },
  logLine: {
    padding: '0.1em 0.5em'
  },
  logIcon: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '2em', 
    width: '2em',
    marginRight: '1em'
  }
})); 

const HistoryView = ({ store }) => {
  const classes = useStyles();
  const history = getHistory(store, 25);

  return (
    <div className={classes.container}>
      <Paper className={classes.historyHeader}>
        <Typography variant="subtitle1">History Log</Typography>
      </Paper>
      <div className={classes.list}>
        {history && history.map(log => (
          <Paper key={log.activityDate} className={classes.logContainer}>
            <Grid container>
              <Grid item xs={2}>
                <CategoryIcon categoryType={log.categoryType} className={classes.logIcon} />
              </Grid>
              <Grid item xs>
                <Paper className={classes.logInfo}>
                  <Typography variant="subtitle2" className={classes.logLine}>
                    {log.title}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle2" className={classes.logLine}>
                    {log.description}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle2" className={classes.logLine}>
                    {formatDataBasic(log.activityDate)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default HistoryView;