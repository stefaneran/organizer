import * as React from 'react';
import styled from 'styled-components';
import { LogInCircle } from '@styled-icons/boxicons-regular/LogInCircle';

const LogInSmall = styled(LogInCircle)`
  height: 1.5em;
  color: #fff;
  margin-right: 0.3em;
`;
export const LogInIconSmall = () => <LogInSmall />

const LogInXL = styled(LogInCircle)`
  height: 5em;
  color: #3f51b5;
`;
export const LogInIconXL = () => <LogInXL />