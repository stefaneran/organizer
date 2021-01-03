import * as React from 'react';
import styled from 'styled-components';
import { ListUl } from '@styled-icons/bootstrap/ListUl';
import { ListNested } from '@styled-icons/bootstrap/ListNested';
import { List } from '@styled-icons/bootstrap/List';
import { FilterList } from '@styled-icons/material-rounded/FilterList';

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
  height: 5em;
  color: #3f51b5;
`;
export const HamburgerIconLarge = () => <HamburgerLarge />

const FilterListLarge = styled(FilterList)`
  height: 6em;
  color: #3f51b5;
`;
export const FilterListIconLarge = () => <FilterListLarge />