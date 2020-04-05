import { CategoryPriorityType } from '@interfaces/categories';
import { getRankOptions } from '@logic/skill.logic';

export interface ICreateSkillForm {
  title: string;
  description: string;
  rank: number;
  priority: CategoryPriorityType;
}

export default {
  data: {
    title: { 
      name: 'title', 
      type: 'text', 
      label: 'Skill Title', 
      helperText: 'Name like "Cooking" or "Guitar"' 
    },
    description: { 
      name: 'description', 
      type: 'text', 
      label: 'Skill Description', 
      helperText: 'Extra info about this skill' 
    },
    rank: { 
      name: 'rank', 
      type: 'select',
      label: 'Current proficiency', 
      helperText: '',
      defaultValue: 1,
      options: getRankOptions() 
    },
    priority: { 
      name: 'priority', 
      type: 'select',
      label: 'Priority', 
      helperText: '',
      defaultValue: CategoryPriorityType.Moderate,
      options: [
        {label: 'Low', value: CategoryPriorityType.Low },
        {label: 'Moderate', value: CategoryPriorityType.Moderate },
        {label: 'High', value: CategoryPriorityType.High }
      ] 
    }
  },
  steps: [
    {
      fields: ['title', 'description'], 
      formGrid: {x: 1, y: 2},
      canSkip: false
    },
    {
      fields: ['rank'], 
      formGrid: {x: 1, y: 1},
      canSkip: false
    },
    {
      fields: ['priority'], 
      formGrid: {x: 1, y: 1},
      canSkip: false
    }
  ]
}