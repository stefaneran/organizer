import * as React from 'react';
import styled from 'styled-components';
import { People } from '@styled-icons/evaicons-solid';

const PeopleIconSmall = () => {
  const Icon = styled(People)`
    height: 1.5em;
    color: #fff;
  `;
  return <Icon />
}

const PeopleIconMedium = () => {
  const Icon = styled(People)`
    height: 1.7em;
    color: #fff;
  `;
  return <Icon />
}

const PeopleIconLarge = () => {
  const Icon = styled(People)`
    height: 2em;
    color: #fff;
  `;
  return <Icon />
}

const PeopleIcon = ({ size }) => {
  const sizeMap = {
    small: <PeopleIconSmall />,
    medium: <PeopleIconMedium />,
    large: <PeopleIconLarge />
  }
  return sizeMap[size];
} 

export default PeopleIcon;