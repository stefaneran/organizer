import * as React from 'react';
import styled from 'styled-components';
import { School } from '@styled-icons/material-rounded/School';

const SchoolSmall = styled(School)`
  height: 1.5em;
  color: #fff;
`;
export const SchoolIconSmall = () => <SchoolSmall />

const SchoolMedium = styled(School)`
  height: 1.7em;
  color: #fff;
`;
export const SchoolIconMedium = () => <SchoolMedium />

const SchoolLarge = styled(School)`
  height: 2em;
  color: #fff;
`;
export const SchoolIconLarge = () => <SchoolLarge />