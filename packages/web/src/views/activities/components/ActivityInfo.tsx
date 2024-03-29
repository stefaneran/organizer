import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
// Components
import ActivityInfoEdit from 'activities/components/ActivityInfoEdit';
import ActivityLocations from 'activities/components/ActivityLocations';
import ActivityParticipants from 'activities/components/ActivityParticipants';
// Utils
import checkIsLocationsEmpty from 'activities/utils/checkIsLocationsEmpty';
// Types
import { Activity } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    transition: 'width 300ms',
    height: '100%',
    overflowY: 'auto',
    paddingRight: '1em'
  },
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
  buttonContainer: {
    marginTop: '1.5em',
    marginBottom: '1.5em',
    textAlign: 'center'
  }
}));

interface Props {
  isOpen: boolean;
  activityId: string;
  activity: Activity;
  onClose: () => void;
  onDeleteActivity: () => void;
}

const ActivityInfo: React.FC<Props> = ({ 
  isOpen,
  activityId,
  activity,
  onClose,
  onDeleteActivity
}) => {
  const classes = useStyles();
  const isCreate = !Boolean(activityId);

  const [isEdit, setIsEdit] = React.useState(isCreate);

  const hasParticipants = Boolean(activity?.participantType.length);
  const hasLocations = !checkIsLocationsEmpty(activity?.locations);

  React.useEffect(() => {
    if (isCreate) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [activityId])

  const toggleEdit = (): void => {
    setIsEdit(!isEdit);
  }

  return (
    <div className={classes.container} style={{ width: isOpen ? '40%' : '0%' }}>
      {isOpen ? (
        <div className={classes.detailsContainer}>
          <div className={classes.header}>
            <div className={classes.headerTitles}>
              <Typography variant="h4">
                {activity?.name ?? 'New Activity'}
              </Typography>
            </div> 
            <div>
              <Tooltip title="Edit Activity Details">
                <IconButton onClick={toggleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close Details">
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {isEdit ? (
            <ActivityInfoEdit
              activityId={activityId}
              activity={activity}
              onClose={onClose}
              toggleEdit={toggleEdit}
            />
          ) : (
            <>
              {hasParticipants ? (
                <ActivityParticipants participantType={activity?.participantType} />
              ) : null}
              {hasLocations ? (
                <>
                  <Divider />
                  <ActivityLocations locations={activity?.locations} />
                  <Divider />
                </>
              ) : null}
            </>
          )}

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
      ) : null}
    </div>
  )
}

export default ActivityInfo;