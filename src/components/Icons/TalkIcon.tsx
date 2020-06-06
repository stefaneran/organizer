import * as React from 'react';
import styled from 'styled-components';
import { GoogleHangouts as Talk } from '@styled-icons/entypo-social';

const TalkIconSmall = () => {
  const Icon = styled(Talk)`
    height: 1.5em;
    color: #fff;
  `;
  return <Icon />
}

const TalkIconMedium = () => {
  const Icon = styled(Talk)`
    height: 1.7em;
    color: #fff;
  `;
  return <Icon />
}

const TalkIconLarge = () => {
  const Icon = styled(Talk)`
    height: 2em;
    color: #fff;
  `;
  return <Icon />
}

const TalkIcon = ({ size }) => {
  const sizeMap = {
    small: <TalkIconSmall />,
    medium: <TalkIconMedium />,
    large: <TalkIconLarge />
  }
  return sizeMap[size];
} 

export default TalkIcon;