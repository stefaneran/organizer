import { PriorityType } from '@interfaces/categories';
import { getRankOptions } from '@logic/skill.logic';

export interface ICreateSkillForm {
  title: string;
  description: string;
  rank: number;
  priority: PriorityType;
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
    weekHourGoal: {
      name: 'weekHourGoal',
      type: 'number',
      label: 'Weekly goal (Hours)',
      helperText: 'How many hours per week this skill should be practiced',
      defaultValue: 0
    },
    priority: { 
      name: 'priority', 
      type: 'select',
      label: 'Priority', 
      helperText: '',
      defaultValue: PriorityType.Moderate,
      options: [
        {label: 'Low', value: PriorityType.Low },
        {label: 'Moderate', value: PriorityType.Moderate },
        {label: 'High', value: PriorityType.High }
      ] 
    },
    rank: { 
      name: 'rank', 
      type: 'select',
      label: 'Current proficiency', 
      helperText: '',
      defaultValue: 1,
      options: getRankOptions() 
    }
  },
  steps: [
    {
      fields: ['title', 'description', 'weekHourGoal'], 
      formGrid: {x: 1, y: 3},
      canSkip: false
    },
    {
      fields: ['rank', 'priority'], 
      formGrid: {x: 1, y: 2},
      canSkip: false
    },
  ]
}