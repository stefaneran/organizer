import * as React from 'react';
import styled from 'styled-components';
import { Book } from '@styled-icons/boxicons-solid';

const BookIconSmall = () => {
  const Icon = styled(Book)`
    height: 1.5em;
    color: #fff;
  `;
  return <Icon />
}

const BookIconMedium = () => {
  const Icon = styled(Book)`
    height: 1.7em;
    color: #fff;
  `;
  return <Icon />
}

const BookIconLarge = () => {
  const Icon = styled(Book)`
    height: 2em;
    color: #fff;
  `;
  return <Icon />
}

const BookIcon = ({ size }) => {
  const sizeMap = {
    small: <BookIconSmall />,
    medium: <BookIconMedium />,
    large: <BookIconLarge />
  }
  return sizeMap[size];
} 

export default BookIcon;