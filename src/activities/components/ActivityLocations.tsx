import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';

const LocationLink = ({ address }) => {
  const styles = {
    color: '#000', 
    height: '0.7em', 
    width: '0.7em',
    position: 'relative' as 'relative',
    top: '0.1em',
    marginRight: '0.3em'
  }
  return (
    <div style={{ display: 'flex' }}>
      <MapIcon style={styles} />
      <a target="_blank" href={`https://www.google.com/maps/place/${address}`}>{address}</a>
    </div>
  )
}

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