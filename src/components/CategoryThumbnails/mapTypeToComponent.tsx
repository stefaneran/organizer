import * as React from 'react';
import { CategoryType } from '@interfaces/categories';
import SkillCategoryThumbnail from './SkillCategoryThumbnail';

export default (data) => {
  const map = {
    [CategoryType.Skill]: <SkillCategoryThumbnail {...data} />
  }
  return map[data.categoryType];
}