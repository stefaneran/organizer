import * as React from 'react';
import styled from 'styled-components';
import { Cart4 } from '@styled-icons/bootstrap/Cart4';
import { CartX } from '@styled-icons/bootstrap/CartX';
import { CartPlus } from '@styled-icons/bootstrap/CartPlus';
import { CartPlusFill } from '@styled-icons/bootstrap/CartPlusFill'
import { CartFill } from '@styled-icons/bootstrap/CartFill'

const CartSmall = styled(Cart4)`
  height: 1.5em;
  color: #fff;
`;
export const CartIconSmall = () => <CartSmall />

const CartLargeFill = styled(CartFill)`
height: 4em;
color: #3f51b5;
`;
export const CartIconLargeFill = () => <CartLargeFill />

const CartXLFill = styled(CartFill)`
height: 7em;
color: #3f51b5;
`;
export const CartIconXLFill = () => <CartXLFill />

const RemoveCartSmall = styled(CartX)`
  height: 1.5em;
  color: rgb(255, 89, 100);
`;
export const RemoveCartIconSmall = () => <RemoveCartSmall />

const RemoveCartMedium = styled(CartX)`
  height: 2.5em;
  color: rgb(255, 89, 100);
`;
export const RemoveCartIconMedium = () => <RemoveCartMedium />

const RemoveCartLarge = styled(CartX)`
  height: 4em;
  color: rgb(255, 89, 100);
`;
export const RemoveCartIconLarge = () => <RemoveCartLarge />

// used in recipes
const WarningCartSmallFill = styled(CartPlusFill)`
  height: 1.5em;
  color: rgb(255, 231, 76);
`;
export const WarningCartIconSmallFill = () => <WarningCartSmallFill />

// used in recipes (mobile)
const WarningCartLargeFill = styled(CartPlusFill)`
  height: 4em;
  color: rgb(255, 231, 76);
`;
export const WarningCartIconLargeFill = () => <WarningCartLargeFill />

const AddCartXS = styled(CartPlus)`
  height: 0.9em;
  color: #3f51b5;
`;
export const AddCartIconXS = () => <AddCartXS />

const AddCartSmall = styled(CartPlus)`
  height: 1.5em;
  color: #3f51b5;
`;
export const AddCartIconSmall = () => <AddCartSmall />

const AddCartMedium = styled(CartPlus)`
  height: 2.5em;
  color: #3f51b5;
`;
export const AddCartIconMedium = () => <AddCartMedium />

const AddCartLarge = styled(CartPlus)`
  height: 4em;
  color: #3f51b5;
`;
export const AddCartIconLarge = () => <AddCartLarge />

const AddCartSmallWhite = styled(CartPlus)`
  height: 1.5em;
  color: #fff;
`;
export const AddCartIconSmallWhite = () => <AddCartSmallWhite />