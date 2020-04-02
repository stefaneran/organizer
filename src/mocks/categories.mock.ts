import { CategoryType, PriorityType } from '@logic/categories/general';
import { ISkillCategory } from '@logic/categories/skill';

const guitar: ISkillCategory = {
  name: "Guitar",
  type: CategoryType.Skill,
  priority: PriorityType.Moderate,
  items: []
};

const cooking: ISkillCategory = {
  name: "Cooking",
  type: CategoryType.Skill,
  priority: PriorityType.Low,
  items: []
};

const programming: ISkillCategory = {
  name: "Programming",
  type: CategoryType.Skill,
  priority: PriorityType.High,
  items: []
};

export default [
  guitar,
  cooking,
  programming
];