import * as React from 'react';
import styled from 'styled-components';
import { ListUl } from '@styled-icons/bootstrap/ListUl';
import { ListNested } from '@styled-icons/bootstrap/ListNested';
import { List } from '@styled-icons/bootstrap/List';

const ListSmall = styled(ListUl)`
  height: 1.5em;
  color: #3f51b5;
`;
export const ListIconSmall = () => <ListSmall />

const NestedSmall = styled(ListNested)`
  height: 1.5em;
  color: #3f51b5;
`;
export const NestedIconSmall = () => <NestedSmall />

const HamburgerLarge = styled(List)`
  height: 4em;
  color: #3f51b5;
`;
export const HamburgerIconLarge = () => <HamburgerLarge />