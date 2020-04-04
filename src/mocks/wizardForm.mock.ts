
export default {
  data: {
    // Example 
    stepOne: { 
      name: 'stepOne', 
      type: 'text', 
      label: 'Step One Test',
      helperText: ''
    },
    stepTwo: { 
      name: 'stepTwo', 
      type: 'text', 
      label: 'Step Two Test',
      helperText: 'Sample text'
    },
    stepTwo2: { 
      name: 'stepTwo2', 
      type: 'text', 
      label: 'Step Two 2 Test',
      helperText: 'Sample text'
    },
    stepThree: {
      name: 'stepThree', 
      type: 'text', 
      label: 'Step Three Test',
      helperText: 'Sample text'
    }
  },
  steps: [
    {
      fields: ['stepOne'], 
      canSkip: false 
    },
    {
      fields: ['stepTwo', 'stepTwo2'], 
      canSkip: true 
    },
    {
      fields: ['stepThree'] 
    }
  ]
}