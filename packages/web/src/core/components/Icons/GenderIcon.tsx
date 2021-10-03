import * as React from 'react';
import styled from 'styled-components';
import { MaleSign } from '@styled-icons/boxicons-regular/MaleSign';
import { FemaleSign } from '@styled-icons/boxicons-regular/FemaleSign';

const MaleChip = styled(MaleSign)`
  height: 1.4em;
  color: #fff;
`;
export const MaleIconChip = () => <MaleChip />

const FemaleChip = styled(FemaleSign)`
  height: 1.4em;
  color: #fff;
`;
export const FemaleIconChip = () => <FemaleChip />