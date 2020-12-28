import * as React from 'react';
import styled from 'styled-components';
import { DeleteBack2 } from '@styled-icons/remix-line/DeleteBack2';

const DeleteSmall = styled(DeleteBack2)`
  height: 1.5em;
  color: rgb(255, 89, 100);
`;
export const DeleteIconSmall = () => <DeleteSmall />