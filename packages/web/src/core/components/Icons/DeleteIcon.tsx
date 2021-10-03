import * as React from 'react';
import styled from 'styled-components';
import { DeleteBack2 } from '@styled-icons/remix-line/DeleteBack2';
import { Trash } from '@styled-icons/boxicons-regular/Trash'

const DeleteSmall = styled(DeleteBack2)`
  height: 1.5em;
  color: rgb(255, 89, 100);
`;
export const DeleteIconSmall = () => <DeleteSmall />

const TrashXS = styled(Trash)`
  height: 1em;
  color: rgb(255, 89, 100);
`;
export const TrashIconXS = () => <TrashXS />

const TrashSmall = styled(Trash)`
  height: 1.8em;
  color: rgb(255, 89, 100);
`;
export const TrashIconSmall = () => <TrashSmall />

const TrashSmallWhite = styled(Trash)`
  height: 1.8em;
  color: #fff;
`;
export const TrashIconSmallWhite = () => <TrashSmallWhite />