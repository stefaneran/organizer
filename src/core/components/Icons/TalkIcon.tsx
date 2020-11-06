import * as React from 'react';
import styled from 'styled-components';
import { GoogleHangouts as Talk } from '@styled-icons/entypo-social';

const TalkExtraSmallBlue = styled(Talk)`
  height: 1em;
  color: #3f51b5;
`;
export const TalkIconExtraSmallBlue = () => <TalkExtraSmallBlue />

const TalkExtraSmall = styled(Talk)`
  height: 1em;
  color: #fff;
`;
export const TalkIconExtraSmall = () => <TalkExtraSmall />

const TalkSmall = styled(Talk)`
  height: 1.5em;
  color: #fff;
`;
export const TalkIconSmall = () => <TalkSmall />

const TalkMedium = styled(Talk)`
  height: 1.7em;
  color: #fff;
`;
export const TalkIconMedium = () => <TalkMedium />

const TalkLarge = styled(Talk)`
  height: 2em;
  color: #fff;
`;
export const TalkIconLarge = () => <TalkLarge />