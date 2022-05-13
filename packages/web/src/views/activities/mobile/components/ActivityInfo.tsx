import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
// Icons
// import EditIcon from '@material-ui/icons/Edit';
// Components
// import ActivityInfoEdit from 'activities/components/ActivityInfoEdit';
import ActivityLocations from 'activities/components/ActivityLocations';
// Utils
import checkIsLocationsEmpty from 'activities/utils/checkIsLocationsEmpty';
// Types
import { Activity } from 'activities/types';
import ChipsGroup from '@core/components/ChipsGroup';

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
    display: 'flex'
  },
  title: {
    fontSize: '5em'
  },
  participantsChips: {
    // TODO - Hack: refactor this later
    '& > div': {
      transform: 'scale(2.3)',
      marginLeft: '22em',
      marginTop: '3em',
      marginBottom: '3em'
    }
  },
  locations: {
    // TODO - Hack: refactor this later
    '& li span': { fontSize: '3rem '},
    '& li p': { fontSize: '2.5rem' },
    '& li a': { fontSize: '2.5rem' },
  },
  buttonContainer: {
    marginTop: '1.5em',
    marginBottom: '1.5em',
    textAlign: 'center'
  }
}));

interface Props {
  activityId: string;
  activity: Activity;
}

const ActivityInfo: React.FC<Props> = ({
  activityId,
  activity
}) => {
  const classes = useStyles();
  const isCreate = !Boolean(activityId);

  const [isEdit, setIsEdit] = React.useState(isCreate);

  const hasParticipants = Boolean(activity?.participantType?.length);
  const hasLocations = !checkIsLocationsEmpty(activity?.locations);

  React.useEffect(() => {
    if (isCreate) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [activityId])

  // const toggleEdit = (): void => setIsEdit(!isEdit);

  return (
    <div className={classes.container}>
      <div className={classes.detailsContainer}>
        <div className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            {activity?.name ?? 'New Activity'}
          </Typography>
          {/* 
          <IconButton onClick={toggleEdit}>
            <EditIcon style={{ width: '3em', height: '3em' }} />
          </IconButton>
          */}
        </div>
      </div>
      <div>
      {isEdit ? (
        <>
        </>
      ) : (
        <>
          {hasParticipants ? (
            <div className={classes.participantsChips}>
              <ChipsGroup 
                options={activity?.participantType}
                selectedOption={''}
                allBlue
              />
            </div>
          ) : null}
          {hasLocations ? (
            <>
              <Divider />
              <ActivityLocations 
                locations={activity?.locations} 
                className={classes.locations} 
                mobile
              />
              <Divider />
            </>
          ) : null}
        </>
      )}
      </div>
    </div>
  )
}

export default ActivityInfo;