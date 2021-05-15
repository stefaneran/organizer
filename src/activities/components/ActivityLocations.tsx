import * as React from 'react';
import { List, ListItem, ListItemText, Link } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';

export const LocationLink = ({ address }) => {
  const styles = {
    color: '#000', 
    height: '0.7em', 
    width: '0.7em',
    position: 'relative' as 'relative',
    top: '0.1em',
    marginRight: '0.3em'
  }
  const isAddress = !Boolean(address.includes('http'))
  const link = isAddress ? `https://www.google.com/maps/place/${address}` : address;
  return (
    <div style={{ display: 'flex' }}>
      {isAddress ? (
        <LocationOnIcon style={styles} />
      ) : (
        <LinkIcon style={styles} />
      )}
      <Link target="_blank" href={link} variant="subtitle2">{address}</Link>
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