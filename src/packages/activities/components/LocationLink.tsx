import * as React from 'react';
import { Link } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import getLinkString from '@activities/utils/getLinkString';

const styles = {
  color: '#000', 
  height: '0.7em', 
  width: '0.7em',
  position: 'relative' as 'relative',
  top: '0.1em',
  marginRight: '0.3em'
}

interface Props {
  address: string;
}

const LocationLink: React.FC<Props> = ({ address = '' }) => {
  
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