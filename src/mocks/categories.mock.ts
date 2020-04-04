import { CategoryType, CategoryPriorityType } from '@interfaces/categories';
import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';

const guitar: ISkillCategory = {
  name: "Guitar",
  type: CategoryType.Skill,
  priority: CategoryPriorityType.Moderate,
  items: []
};

const cooking: ISkillCategory = {
  name: "Cooking",
  type: CategoryType.Skill,
  priority: CategoryPriorityType.Low,
  items: []
};

const programming: ISkillCategory = {
  name: "Programming",
  type: CategoryType.Skill,
  priority: CategoryPriorityType.High,
  items: []
};

export default [
  guitar,
  cooking,
  programming
];