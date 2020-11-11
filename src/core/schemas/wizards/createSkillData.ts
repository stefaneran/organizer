import { PriorityType } from "@core/interfaces/general";
import { getRankOptions } from '@skills/utils/general';

export default {
  data: {
    name: { 
      name: 'name', 
      type: 'text', 
      label: 'Skill Name', 
      helperText: 'Name like "Cooking" or "Guitar"' 
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
      fields: ['name', 'weekHourGoal'], 
      formGrid: {x: 1, y: 2},
      canSkip: false
    },
    {
      fields: ['rank', 'priority'], 
      formGrid: {x: 1, y: 2},
      canSkip: false
    },
  ]
}