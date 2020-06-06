import * as React from 'react';
import styled from 'styled-components';
import { Brain } from '@styled-icons/fa-solid';

const BrainSmall = styled(Brain)`
  height: 1.5em;
  color: #fff;
`;
export const BrainIconSmall = () => <BrainSmall />

const BrainMedium = styled(Brain)`
  height: 1.7em;
  color: #fff;
`;
export const BrainIconMedium = () => <BrainMedium />

const BrainLarge = styled(Brain)`
  height: 2em;
  color: #fff;
`;
export const BrainIconLarge = () => <BrainLarge />