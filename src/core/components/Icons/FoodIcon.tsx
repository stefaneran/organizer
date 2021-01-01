import * as React from 'react';
import styled from 'styled-components';
import { Fastfood } from '@styled-icons/material-rounded/Fastfood';

const FoodSmall = styled(Fastfood)`
  height: 1.5em;
  color: #fff;
`;
export const FoodIconSmall = () => <FoodSmall />

const FoodXS = styled(Fastfood)`
  height: 0.9em;
  color: #3f51b5;
`;
export const FoodIconXS = () => <FoodXS />