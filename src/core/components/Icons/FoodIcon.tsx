import * as React from 'react';
import styled from 'styled-components';
import { Fastfood } from '@styled-icons/material-rounded/Fastfood';

const FoodXS = styled(Fastfood)`
  height: 0.9em;
  color: #3f51b5;
`;
export const FoodIconXS = () => <FoodXS />

const FoodSmall = styled(Fastfood)`
  height: 1.5em;
  color: #fff;
`;
export const FoodIconSmall = () => <FoodSmall />

const FoodLarge = styled(Fastfood)`
  height: 4em;
  color: #3f51b5;
`;
export const FoodIconLarge = () => <FoodLarge />

const FoodXL = styled(Fastfood)`
  height: 7em;
  color: #3f51b5;
`;
export const FoodIconXL = () => <FoodXL />