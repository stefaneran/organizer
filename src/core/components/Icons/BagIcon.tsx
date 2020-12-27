import * as React from 'react';
import styled from 'styled-components';
import { BagX } from '@styled-icons/bootstrap/BagX';
import { BagPlus } from '@styled-icons/bootstrap/BagPlus';

const RemoveBagSmall = styled(BagX)`
  height: 1.5em;
  color: #3f51b5;
`;
export const RemoveBagIconSmall = () => <RemoveBagSmall />

const AddBagSmall = styled(BagPlus)`
  height: 1.5em;
  color: #3f51b5;
`;
export const AddBagIconSmall = () => <AddBagSmall />