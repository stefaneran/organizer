import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import { getWeekHourGoalProgress, formatDateBasic } from '@utils/dateUtils';
import formatHourValue from '@utils/formatHourValue';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    padding: '1em',
    backgroundColor: theme.palette.primary.main
  },
  innerContainer: {
    height: '100%',
    padding: '0.2em 0.5em'
  },
  infoLine: {
    padding: '0.3em 0.2em',
    position: 'relative'
  },
  editBtn: {
    padding: '4px',
    position: 'absolute',
    right: '0'
  }
}));

const SkillGeneralInfo = ({ skill, rank, dialogActions, globalDialogActions, onDelete }) => {
  const classes = useStyles();

  const { title, weekHourGoal, lastActivity } = skill;
  const weekHourProgress = getWeekHourGoalProgress(skill);

  return (
    <Paper className={classes.container}>
      <Grid container direction="column" justify="space-between" style={{ height: '100%' }}>

        <Grid item className={'gridRow'} style={{ marginBottom: '1em' }}>
          <Paper className={classes.innerContainer}>
            <Typography variant="h5">
              {title || "Error: No Title"}
            </Typography>
          </Paper>
        </Grid>

        <Grid item container direction="column" style={{ marginBottom: '1em' }}>
          <Paper className={classes.innerContainer}>
            <Grid item className={'gridRow'}>
              <Typography variant="subtitle1" className={classes.infoLine}>
                Level: {rank.title}
              </Typography>
            </Grid>

            <Divider />

            <Grid item className={'gridRow'}>
              <Typography variant="subtitle1" className={classes.infoLine}>
                Week Goal: {`${formatHourValue(weekHourProgress)} / ${formatHourValue(weekHourGoal)}`}
                <IconButton className={classes.editBtn} onClick={dialogActions.open({ type: 'updateGoal' })}>
                  <EditIcon />
                </IconButton>
              </Typography>
            </Grid>

            <Divider />

            <Grid item className={'gridRow'}>
              <Typography variant="subtitle1" className={classes.infoLine}>
                Last Activity: {formatDateBasic(lastActivity) || "Error: No Activity"}
              </Typography>
            </Grid>
          </Paper>
        </Grid>

        <Grid item className={'gridRow'} style={{ marginBottom: '1em' }}>
          <Paper style={{ padding: '0.5em' }}>
            <Grid container justify="space-between">

              <Grid item>
                <Button  
                  variant="outlined" 
                  color="primary" 
                  endIcon={<UpdateIcon />} 
                  onClick={globalDialogActions.open({ type: 'updateHours', data: title })}
                >
                  Practice
                </Button>
              </Grid>

              <Tooltip title={'Will be enabled when I implement a confirmation dialog'}>
                <Grid item>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    endIcon={<DeleteIcon />} 
                    onClick={onDelete} 
                    disabled
                  >
                    Delete
                  </Button>
                </Grid>
              </Tooltip>
              
            </Grid>
          </Paper>
        </Grid>

      </Grid>

    </Paper>
  )
}

export default SkillGeneralInfo;