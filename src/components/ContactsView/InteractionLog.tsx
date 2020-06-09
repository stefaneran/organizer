import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';
import { TalkIconMedium } from '@components/Icons/TalkIcon';
import { PeopleIconMedium } from '@components/Icons/PeopleIcon';
import InteractionType from '@interfaces/contacts/InteractionType.interface';
import { formatDateClassic, getDaysFromDate } from '@utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  historyLog: {
    background: theme.palette.primary.main,
    padding: '0.5em 0.5em 0.5em 0',
    marginBottom: '0.5em'
  },
  historyLogIcon: {
    '& svg': {
      position: 'relative' as 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  historyLogContent: {
    padding: '0.2em'
  },
  historyLogLine: {
    padding: '0.1em 0.5em'
  }
}));

const InteractionLog = ({ log }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.historyLog}>
      <Grid container>
        <Grid item xs={2} className={classes.historyLogIcon}>
          {log.type === InteractionType.Talk ? (
            <TalkIconMedium />
          ) : (
            <PeopleIconMedium />
          )}
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.historyLogContent}>
            <Typography variant="subtitle1" className={classes.historyLogLine}>
              {log.type}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" className={classes.historyLogLine}>
              {`${formatDateClassic(log.activityDate)} - ${getDaysFromDate(log.activityDate)} days ago`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default InteractionLog;