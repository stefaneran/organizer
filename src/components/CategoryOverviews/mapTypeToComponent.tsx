import * as React from 'react';
import { CategoryType } from '@interfaces/categories';
import { SkillCategoryOverview } from './SkillCategoryOverview';

export default (mapData) => {
  const map = {
    [CategoryType.Skill]: <SkillCategoryOverview store={mapData.store} skill={mapData.categoryData} />
  }
  return map[mapData.categoryType];
}