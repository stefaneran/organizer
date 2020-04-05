import { CategoryType, CategoryPriorityType } from '@interfaces/categories';
import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';

const guitar: ISkillCategory = {
  title: "Guitar",
  description: "Just playing things",
  categoryType: CategoryType.Skill,
  priority: CategoryPriorityType.Moderate,
  items: [],
  archive: [],
  totalHours: 580,
  totalXP: 5800
};

const cooking: ISkillCategory = {
  title: "Cooking",
  description: "Just cooking things",
  categoryType: CategoryType.Skill,
  priority: CategoryPriorityType.Low,
  items: [],
  archive: [],
  totalHours: 1500,
  totalXP: 150000
};

const programming: ISkillCategory = {
  title: "Programming",
  description: "Just coding things",
  categoryType: CategoryType.Skill,
  priority: CategoryPriorityType.High,
  items: [],
  archive: [],
  totalHours: 7000,
  totalXP: 700000
};

export default [
  guitar,
  cooking,
  programming
];