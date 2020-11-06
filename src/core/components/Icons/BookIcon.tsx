import * as React from 'react';
import styled from 'styled-components';
import { Book } from '@styled-icons/boxicons-solid';

const BookSmall = styled(Book)`
  height: 1.5em;
  color: #fff;
`;
export const BookIconSmall = () => <BookSmall />

const BookMedium = styled(Book)`
  height: 1.7em;
  color: #fff;
`;
export const BookIconMedium = () => <BookMedium />

const BookLarge = styled(Book)`
    height: 2em;
    color: #fff;
  `;
export const BookIconLarge = () => <BookLarge />