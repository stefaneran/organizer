import * as React from 'react';
import styled from 'styled-components';
import { School } from '@styled-icons/material-rounded/School';

const SchoolIconSmall = () => {
  const Icon = styled(School)`
    height: 1.5em;
    color: #fff;
  `;
  return <Icon />
}

const SchoolIconMedium = () => {
  const Icon = styled(School)`
    height: 1.7em;
    color: #fff;
  `;
  return <Icon />
}

const SchoolIconLarge = () => {
  const Icon = styled(School)`
    height: 2em;
    color: #fff;
  `;
  return <Icon />
}

const SchoolIcon = ({ size }) => {
  const sizeMap = {
    small: <SchoolIconSmall />,
    medium: <SchoolIconMedium />,
    large: <SchoolIconLarge />
  }
  return sizeMap[size];
} 

export default SchoolIcon;