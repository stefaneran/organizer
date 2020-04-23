import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import SkillIcon from '@static/skill.svg';
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
  },
  icon: {
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
    <Paper className={classes.container}>
      <Typography variant="subtitle1">History Log</Typography>
      <div className={classes.list}>
        {history && history.map(log => (
          <Paper key={log.activityDate} className={classes.log}>
            <Grid container>
              <Grid item>
                <img src={SkillIcon} className={classes.icon} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{log.title}</Typography>
                <Typography variant="subtitle2">{log.description}</Typography>
                <Typography variant="subtitle2">{formatDataBasic(log.activityDate)}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}

export default HistoryView;