import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ActivityTypeIcon from 'activities/components/ActivityTypeIcon';
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
  activitiesAmount: number;
  onSelect: (activityType?: ActivityType) => void;
}

const ActivitiesTypesListItem: React.FC<Props> = ({ 
  activityType,
  activitiesAmount,
  onSelect
}) => {
  const classes = useStyles();

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