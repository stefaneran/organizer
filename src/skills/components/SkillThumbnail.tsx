import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { VerticalProgressBar } from '@skills/components/ProgressBar';
import DialogTypes from '@skills/interfaces/DialogTypes.interface';
import { getRankByXP } from '@skills/utils/general';
import { getWeekHourGoalProgress, getDaysFromDate } from '@core/utils/dateUtils';
import formatHourValue from '@core/utils/formatHourValue';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '0.5em',
    cursor: 'pointer',
    transition: 'background-color 300ms',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    }
  },
  paper: {
    width: '100%',
    padding: '0.5em'
  },
  button: {
    width: '100%'
  },
  name: {
    marginBottom: '0.5em'
  },
  activity: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden'
  },
  activityText: {
    padding: '0.5em 0',
    paddingRight: '0.5em',
    paddingLeft: '0.5em'
  }
}));

const SkillThumbnail = ({ skill, onOpenDialog }) => {
  const classes = useStyles();

  const { id, name, totalXP, weekHourGoal, lastActivity } = skill;

  const rank = getRankByXP(totalXP);
  const weekProgress = getWeekHourGoalProgress(skill);
  const daysSinceLastActivity = getDaysFromDate(lastActivity);

  const handlePractice = (e) => {
    e.stopPropagation();
    onOpenDialog(DialogTypes.UpdateHours, id)();
  }

  return (
    <Paper className={classes.container}>

      <Paper className={clsx(classes.paper, classes.name)}>
        <Typography variant="subtitle1">{name}</Typography>
      </Paper>

      <Grid container spacing={1} style={{ marginBottom: '0.2em' }}> 
        <Grid item xs={2}>
          <VerticalProgressBar 
            current={weekProgress} 
            max={weekHourGoal} 
            tooltip={{ text: `${formatHourValue(weekProgress)} hours out of ${formatHourValue(weekHourGoal)}`, placement: 'right'}}
          />
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper} style={{ marginBottom: '0.5em' }}>
            <Typography variant="subtitle2">Level: {rank.title}</Typography>
          </Paper>
          <Paper className={classes.activity} style={{ display: 'flex', marginBottom: '0.5em' }}>
            <Typography className={classes.activityText} variant="subtitle2">
              {skill.activity}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography className={classes.activityText} variant="subtitle2">
              {daysSinceLastActivity > 0 ? `${daysSinceLastActivity} Days ago` : `Today`}
            </Typography>
          </Paper>
          <Paper className={classes.paper}> 
            <Typography variant="subtitle2">Last Action</Typography>
            <Divider style={{ marginBottom: '0.2em', marginTop: '0.2em' }} />
            <Typography variant="subtitle2">Coming Soon</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.paper}> 
        <Button 
          className={classes.button} 
          variant="outlined" 
          color="primary" 
          endIcon={<UpdateIcon />} 
          onClick={handlePractice}
        >
          Practice
        </Button>
      </Paper>
    </Paper>
  );
}

export default SkillThumbnail;