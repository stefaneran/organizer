import * as React from 'react';
import styled from 'styled-components';
import { Cart4 } from '@styled-icons/bootstrap/Cart4';
import { CartX } from '@styled-icons/bootstrap/CartX';
import { CartPlus } from '@styled-icons/bootstrap/CartPlus';

const CartSmall = styled(Cart4)`
  height: 1.5em;
  color: #fff;
`;
export const CartIconSmall = () => <CartSmall />

const RemoveCartSmall = styled(CartX)`
  height: 1.5em;
  color: #3f51b5;
`;
export const RemoveCartIconSmall = () => <RemoveCartSmall />

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