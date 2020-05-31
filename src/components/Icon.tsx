import * as React from 'react';
import styled from 'styled-components';
import { CategoryType } from '@interfaces/general';
import { SkillItemType } from '@interfaces/skill/SkillItem.interface';
import { Brain } from '@styled-icons/fa-solid';
import { Book } from '@styled-icons/boxicons-solid';
import { School } from '@styled-icons/material-rounded/School';
import { People } from '@styled-icons/evaicons-solid';

interface IconProps {
  type: 'Category' | 'SkillItem';
  subType: CategoryType | SkillItemType | string;
  style?: {
    height: string;
    color: string;
  }
}

const getStyledIcon = (Icon, style) => {
  const height = style ? style.height : '2em';
  const color = style ? style.color : '#fff';
  const IconComponent = styled(Icon)`
    height: ${height};
    color: ${color};
  `;
  return <IconComponent />
}

const Icon = ({ type, subType, style }: IconProps) => {

  const getIcon = () => {
    const map = {
      Category: {
        [CategoryType.Skill]: () => getStyledIcon(Brain, style),
        [CategoryType.Contacts]: () => getStyledIcon(People, style)
      },
      SkillItem: {
        [SkillItemType.Book]: () => getStyledIcon(Book, style), 
        [SkillItemType.Course]: () => getStyledIcon(School, style)
      }
    }
    return map[type][subType]();
  }

  return (
    <>
      {getIcon()}
    </>
  )
}

export default Icon;