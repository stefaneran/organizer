import * as React from 'react';
import SkillIcon from '@static/skill.svg';
import FitnessIcon from '@static/fitness.svg';
import SocialIcon from '@static/social.svg';
import { CategoryType } from '@interfaces/categories';

interface IconProps {
  categoryType: CategoryType,
  className?,
  style?
}

const mapTypeToIcon = (type) => {
  const map = {
    [CategoryType.Skill]: SkillIcon,
    [CategoryType.Fitness]: FitnessIcon,
    [CategoryType.Social]: SocialIcon
  }
  return map[type]
}

const CategoryIcon = ({ categoryType, className, style }: IconProps) => {
  const shouldDefault = !className && !style;
  return (
    <img src={mapTypeToIcon(categoryType)} className={className} style={shouldDefault ? { height: '2em', width: '2em' } : style} />
  )
}
export default CategoryIcon;