import * as React from 'react';
import styled from 'styled-components';
import { BagFill } from '@styled-icons/bootstrap/BagFill';
import { BagX } from '@styled-icons/bootstrap/BagX';
import { BagXFill } from '@styled-icons/bootstrap/BagXFill';
import { BagPlus } from '@styled-icons/bootstrap/BagPlus';
import { BagCheck } from '@styled-icons/bootstrap/BagCheck';
import { BagCheckFill } from '@styled-icons/bootstrap/BagCheckFill';

const BagXS = styled(BagFill)`
  height: 0.9em;
  color: #3f51b5;
`;
export const BagIconXS = () => <BagXS />

const BagWhiteXS = styled(BagFill)`
  height: 0.9em;
  color: #fff;
`;
export const BagIconWhiteXS = () => <BagWhiteXS />

const BagSmall = styled(BagFill)`
  height: 1.5em;
  color: #3f51b5;
`;
export const BagIconSmall = () => <BagSmall />

const BagSmallWhite = styled(BagFill)`
  height: 1.5em;
  color: #fff;
`;
export const BagIconSmallWhite = () => <BagSmallWhite />

const BagMedium = styled(BagFill)`
  height: 2.5em;
  color: #3f51b5;
`;
export const BagIconMedium = () => <BagMedium />

const BagLarge = styled(BagFill)`
  height: 4em;
  color: #3f51b5;
`;
export const BagIconLarge = () => <BagLarge />

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

const RemoveBagMedium = styled(BagX)`
  height: 2.5em;
  color: rgb(255, 89, 100);
`;
export const RemoveBagIconMedium = () => <RemoveBagMedium />

const RemoveBagLarge = styled(BagX)`
  height: 4em;
  color: rgb(255, 89, 100);
`;
export const RemoveBagIconLarge = () => <RemoveBagLarge />

const RemoveBagSmallFill = styled(BagXFill)`
  height: 1.5em;
  color: rgb(255, 89, 100);
`;
export const RemoveBagIconSmallFill = () => <RemoveBagSmallFill />

const RemoveBagLargeFill = styled(BagXFill)`
  height: 4em;
  color: rgb(255, 89, 100);
`;
export const RemoveBagIconLargeFill = () => <RemoveBagLargeFill />

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

const AddBagMedium = styled(BagPlus)`
  height: 2.5em;
  color: #3f51b5;
`;
export const AddBagIconMedium = () => <AddBagMedium />

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

const CheckBagLargeFill = styled(BagCheckFill)`
  height: 4em;
  color: #AEF78E;
`;
export const CheckBagIconLargeFill = () => <CheckBagLargeFill />