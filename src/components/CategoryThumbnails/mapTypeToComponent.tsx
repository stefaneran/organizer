import * as React from 'react';
import { CategoryType } from '@interfaces/categories';
import { SkillCategoryThumbnail } from './SkillCategoryThumbnail';

export default (data, globalDialogActions) => {
  const map = {
    [CategoryType.Skill]: <SkillCategoryThumbnail skill={{...data}} globalDialogActions={globalDialogActions} />
  }
  return map[data.categoryType];
}