import * as React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import LocationLink from '@activities/components/LocationLink';
import { ActivityLocation } from '@activities/types';

interface Props {
  locations: ActivityLocation[];
}

const getKey = (location, index) => `${location.name}-${location.address}-${index}`;

const ActivityLocations: React.FC<Props> = ({ locations }) => {
  return (
    <List 
      component="div" 
      disablePadding 
      data-testid="activity-location-list"
    >
      {locations.map((location, index) => (
        <ListItem key={getKey(location, index)} data-testid="activity-location-item">
          <ListItemText 
            primary={location.name} 
            secondary={<LocationLink address={location.address} />} 
          />
        </ListItem>
      ))}
    </List>
  )
}

export default ActivityLocations;