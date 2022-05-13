import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Components
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ActivityTypeIcon from 'activities/components/ActivityTypeIcon';
// Utils
import getNumOfActivities from 'activities/utils/getNumOfActivities';
// Types
import { RootState } from '@core/types';
import { ActivityType } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '3em',
    '& span': { fontSize: '4rem '},
    '& p': { fontSize: '3rem' }
  },
  activityIcon: {
    marginRight: '1em'
  }
}));

interface Props {
  activityType: ActivityType;
  onSelect: (activityType?: ActivityType) => void;
}

const ActivitiesTypesListItem: React.FC<Props> = ({ 
  activityType,
  onSelect
}) => {
  const classes = useStyles();
  const { activities } = useSelector((store: RootState) => store.activitiesStore);

  const activitiesAmount = getNumOfActivities(activities, activityType);

  const handleSelect = () => {
    onSelect(activityType);
  }

  return (
    <ListItem
      button
      onClick={handleSelect}
      className={classes.container}
    >
      <ListItemText 
        primary={activityType} 
        secondary={`${activitiesAmount} ${activitiesAmount > 1 ? 'Activities' : 'Activity'}`} 
      />
      <ListItemIcon className={classes.activityIcon}>
        <ActivityTypeIcon activityType={activityType} style={{ width: '3.5em', height: '3.5em' }} />
      </ListItemIcon>
    </ListItem>
  )
}

export default ActivitiesTypesListItem;