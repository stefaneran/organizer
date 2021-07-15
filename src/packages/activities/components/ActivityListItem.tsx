import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import { Activity } from '@activities/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  isSelected: {
    background: theme.palette.primary.main,
    color: '#fff',
    transition: 'background 300ms',
    '&:hover': {
      background: theme.palette.primary.light
    }
  }
}));

interface Props {
  activity: Activity;
  isSelected: boolean;
  onOpenInfo: (activityId?: string) => void;
}

const ActivityListItem: React.FC<Props> = ({ 
  activity, 
  isSelected,
  onOpenInfo
}) => {
  const classes = useStyles();
  const handleSelect = () => onOpenInfo(activity.id);
  return (
    <ListItem 
      className={isSelected ? classes.isSelected : ''}
      button 
      onClick={handleSelect}
      data-testid={`activity-list-item-${activity.id}`}
    >
      <ListItemText primary={activity.name} secondary={activity.activityType} />
    </ListItem>
  )
}

export default ActivityListItem;