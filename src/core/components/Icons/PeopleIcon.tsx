import * as React from 'react';
import styled from 'styled-components';
import { People } from '@styled-icons/evaicons-solid';

const PeopleExtraSmallBlue = styled(People)`
  height: 1em;
  color: #3f51b5;
`;
export const PeopleIconExtraSmallBlue = () => <PeopleExtraSmallBlue />

const PeopleExtraSmall = styled(People)`
  height: 1em;
  color: #fff;
`;
export const PeopleIconExtraSmall = () => <PeopleExtraSmall />

const PeopleSmall = styled(People)`
  height: 1.5em;
  color: #fff;
`;
export const PeopleIconSmall = () => <PeopleSmall />

const PeopleMedium = styled(People)`
  height: 1.7em;
  color: #fff;
`;
export const PeopleIconMedium = () => <PeopleMedium />

const PeopleLarge = styled(People)`
    height: 4em;
    color: #3f51b5;
  `;
export const PeopleIconLarge = () => <PeopleLarge />

const PeopleXL = styled(People)`
    height: 7em;
    color: #3f51b5;
  `;
export const PeopleIconXL = () => <PeopleXL />