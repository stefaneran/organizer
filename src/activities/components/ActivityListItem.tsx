import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

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

const ActivityListItem = ({ item, onSelectActivity, isSelected }) => {
  const classes = useStyles();
  return (
    <ListItem 
      className={isSelected ? classes.isSelected : ''}
      button 
      onClick={onSelectActivity(item.id)}
    >
      <ListItemText primary={item.name} secondary={item.category} />
    </ListItem>
  )
}

export default ActivityListItem;