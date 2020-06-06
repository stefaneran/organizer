import * as React from 'react';
import styled from 'styled-components';
import { Brain } from '@styled-icons/fa-solid';

const BrainIconSmall = () => {
  const Icon = styled(Brain)`
    height: 1.5em;
    color: #fff;
  `;
  return <Icon />
}

const BrainIconMedium = () => {
  const Icon = styled(Brain)`
    height: 1.7em;
    color: #fff;
  `;
  return <Icon />
}

const BrainIconLarge = () => {
  const Icon = styled(Brain)`
    height: 2em;
    color: #fff;
  `;
  return <Icon />
}

const BrainIcon = ({ size }) => {
  const sizeMap = {
    small: <BrainIconSmall />,
    medium: <BrainIconMedium />,
    large: <BrainIconLarge />
  }
  return sizeMap[size];
} 

export default BrainIcon;