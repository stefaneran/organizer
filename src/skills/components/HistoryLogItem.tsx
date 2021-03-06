import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';
import { BrainIconMedium, BrainIconLarge } from '@core/components/Icons/BrainIcon';
import { BookIconMedium } from '@core/components/Icons/BookIcon';
import { SchoolIconMedium } from '@core/components/Icons/SchoolIcon';
import { formatDateBasic } from '@core/utils/dateUtils';
import { SkillHistoryLog } from '@skills/interfaces/SkillHistoryLog.interface';
import { SkillItemType } from '@skills/interfaces/SkillItem.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  logContainer: {
    padding: '0.5em 0.5em 0.5em 0',
    marginBottom: '0.5em',
    backgroundColor: theme.palette.primary.main
  },
  logInfo: {
    padding: '0.2em'
  },
  logLine: {
    padding: '0.1em 0.5em'
  },
  iconContainer: {
    position: 'relative',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconContainerTwo: {
    '&>svg': {
      display: 'block',
      '&:first-child': {
        marginBottom: '0.5em'
      }
    }
  }
})); 

const HistoryLogItem = ({ log }: { log: SkillHistoryLog }) => {
  const classes = useStyles();

  const { title, description, activityDate } = log;

  const Icons = () => {
    const { subType } = log;
    const subTypeIcon = {
      [SkillItemType.Book]: <BookIconMedium />,
      [SkillItemType.Course]: <SchoolIconMedium />
    }
    return (
      <div className={clsx(classes.iconContainer, (subType ? classes.iconContainerTwo : ''))}>
        {subType ? <BrainIconMedium /> : <BrainIconLarge />}
        {subType ? subTypeIcon[subType] : undefined}
      </div>
    )
  }

  return (
    <Paper key={log.activityDate} className={classes.logContainer}>
      <Grid container>
        <Grid item xs={2}>
          <Icons />
        </Grid>
        <Grid item xs>
          <Paper className={classes.logInfo}>
            <Typography variant="subtitle2" className={classes.logLine}>
              {title}
            </Typography>
            <Divider />
            <Typography variant="subtitle2" className={classes.logLine}>
              {description}
            </Typography>
            <Divider />
            <Typography variant="subtitle2" className={classes.logLine}>
              {formatDateBasic(activityDate)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default HistoryLogItem;