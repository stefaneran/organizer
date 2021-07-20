import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ActivityTypeIcon from 'activities/components/ActivityTypeIcon';
import { Activity } from 'activities/types';

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
  activity: Activity;
  locationsAmount: number;
  onSelect: (activityId?: string) => void;
}

const ActivitiesListItem: React.FC<Props> = ({ 
  activity,
  locationsAmount,
  onSelect
}) => {
  const classes = useStyles();

  const { id, name, activityType } = activity;

  const handleSelect = () => {
    onSelect(id);
  }

  return (
    <ListItem
      className={classes.container}
      onClick={handleSelect}
      button
    >
      <ListItemText 
        primary={name} 
        secondary={`${locationsAmount} Locations`} 
      />
      <ListItemIcon className={classes.activityIcon}>
        <ActivityTypeIcon 
          activityType={activityType} 
          style={{ width: '3.5em', height: '3.5em' }} 
        />
      </ListItemIcon>
    </ListItem>
  )
}

export default ActivitiesListItem;