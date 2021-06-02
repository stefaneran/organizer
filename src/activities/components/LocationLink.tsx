import * as React from 'react';
import { List, ListItem, ListItemText, Link } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';

const getLinkString = (link) => {
  const possiblePrefixes = [
    'https://www.',
    'http://www.',
    'https://',
    'http://'
  ];
  let linkString = link;
  for (const prefix of possiblePrefixes) {
    if (link.includes(prefix)) {
      linkString = linkString.replace(prefix, '');
      break;
    }
  }
  return linkString;
}

const styles = {
  color: '#000', 
  height: '0.7em', 
  width: '0.7em',
  position: 'relative' as 'relative',
  top: '0.1em',
  marginRight: '0.3em'
}

const LocationLink = ({ address = '' }) => {
  
  const hasAddress = Boolean(address.length);
  const isLink = Boolean(address.includes('http'))
  const link = isLink ? address : `https://www.google.com/maps/place/${address}`;
  const linkText = isLink ? getLinkString(address) : address;

  return (
    <>
      {hasAddress ? (
        <div style={{ display: 'flex' }}>
          {isLink ? (
            <LinkIcon style={styles} />
          ) : (
            <LocationOnIcon style={styles} />
          )}
          <Link target="_blank" href={link} variant="subtitle2">{linkText}</Link>
        </div>
      ) : null}
    </>
  )
}

export default LocationLink;