import * as React from 'react';
import styled from 'styled-components';
import { BagFill } from '@styled-icons/bootstrap/BagFill';
import { BagX } from '@styled-icons/bootstrap/BagX';
import { BagXFill } from '@styled-icons/bootstrap/BagXFill';
import { BagPlus } from '@styled-icons/bootstrap/BagPlus';
import { BagCheck } from '@styled-icons/bootstrap/BagCheck';
import { BagCheckFill } from '@styled-icons/bootstrap/BagCheckFill';

const BagSmall = styled(BagFill)`
  height: 1.5em;
  color: #3f51b5;
`;
export const BagIconSmall = () => <BagSmall />

const RemoveBagXS = styled(BagX)`
  height: 0.9em;
  color: rgb(255, 89, 100);
`;
export const RemoveBagIconXS = () => <RemoveBagXS />

const RemoveBagSmall = styled(BagX)`
  height: 1.5em;
  color: rgb(255, 89, 100);
`;
export const RemoveBagIconSmall = () => <RemoveBagSmall />

const RemoveBagSmallFill = styled(BagXFill)`
  height: 1.5em;
  color: rgb(255, 89, 100);
`;
export const RemoveBagIconSmallFill = () => <RemoveBagSmallFill />

const AddBagXS = styled(BagPlus)`
  height: 0.9em;
  color: #3f51b5;
`;
export const AddBagIconXS = () => <AddBagXS />

const AddBagSmall = styled(BagPlus)`
  height: 1.5em;
  color: #3f51b5;
`;
export const AddBagIconSmall = () => <AddBagSmall />

const CheckBagSmall = styled(BagCheck)`
  height: 1.5em;
  color: #AEF78E;
`;
export const CheckBagIconSmall = () => <CheckBagSmall />

const CheckBagSmallFill = styled(BagCheckFill)`
  height: 1.5em;
  color: #AEF78E;
`;
export const CheckBagIconSmallFill = () => <CheckBagSmallFill />