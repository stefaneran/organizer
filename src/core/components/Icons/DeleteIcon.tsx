import * as React from 'react';
import styled from 'styled-components';
import { Delete } from '@styled-icons/feather/Delete';

const DeleteSmall = styled(Delete)`
  height: 1.5em;
  color: #3f51b5;
`;
export const DeleteIconSmall = () => <DeleteSmall />