import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

const ActivityListItem = ({ item, onSelectActivity }) => {
  return (
    <ListItem button onClick={onSelectActivity(item.id)}>
      <ListItemText primary={item.name} secondary={item.category} />
    </ListItem>
  )
}

export default ActivityListItem;