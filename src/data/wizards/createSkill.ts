import { getRankOptions } from '@logic/skill.logic';
// Step 1: title and description
// Step 2: Done this before? Select with skill ranks 
// Finish

// Calculate hours + XP 
// Create

export interface ICreateSkillForm {
  title: string;
  description: string;
  rank: number;
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
    }
  ]
}