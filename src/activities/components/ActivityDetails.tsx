import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Divider, Button, IconButton, Tooltip, Chip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import ActivityLocations from '@activities/components/ActivityLocations';

const useStyles = makeStyles((theme: Theme) => createStyles({
  detailsContainer: {
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerTitles: {
    maxWidth: '75%'
  },
  participantsContainer: {
    marginBottom: '1em'
  },
  chip: {
    marginRight: '0.5em'
  },
  buttonContainer: {
    marginTop: '1.5em',
    marginBottom: '1.5em',
    textAlign: 'center'
  }
}));

const ActivityDetails = ({ 
  activity, 
  onSelectActivity, 
  onOpenEditActivity,
  onDeleteActivity
}) => {
  const classes = useStyles();

  const hasActivity = Boolean(activity);

  return (
    <>
    {hasActivity && (
      <div className={classes.detailsContainer}>
        <div className={classes.header}>
          <div className={classes.headerTitles}>
            <Typography variant="h4">
              {activity.name}
            </Typography>
          </div> 
          <div>
            <Tooltip title="Edit Recipe Details">
              <IconButton onClick={onOpenEditActivity('edit')}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close Details">
              <IconButton onClick={onSelectActivity('')}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={classes.participantsContainer}>
          {activity.participantType ? activity.participantType.map(type => (
            <Chip 
              className={classes.chip}
              key={type} 
              label={type}
              color="primary"
            />
          )) : null}
        </div>
        <Divider />
        <ActivityLocations locations={activity.locations} />
        <Divider />
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<TrashIconXS />}
            onClick={onDeleteActivity}
          >
            Delete
          </Button>
        </div>
      </div>
    )}
    </>
  )
}

export default ActivityDetails;