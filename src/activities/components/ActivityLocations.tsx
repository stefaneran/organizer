import * as React from 'react';
import { List, ListItem, ListItemText, Link } from '@material-ui/core';
import LocationLink from '@activities/components/LocationLink';

const ActivityLocations = ({ locations }) => {
  return (
    <List component="div" disablePadding>
      {locations.map(location => (
        <ListItem key={location.address}>
          <ListItemText primary={location.name} secondary={<LocationLink address={location.address} />} />
        </ListItem>
      ))}
    </List>
  )
}

export default ActivityLocations;