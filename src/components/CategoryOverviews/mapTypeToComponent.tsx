import * as React from 'react';
import { CategoryType } from '@interfaces/categories';
import SkillCategoryOverview from './SkillCategoryOverview';

export default (data) => {
  const map = {
    [CategoryType.Skill]: <SkillCategoryOverview {...data} />
  }
  return map[data.categoryType];
}