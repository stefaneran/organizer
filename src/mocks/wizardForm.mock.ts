// Example Wizard Form for testing the Wizard, FormCreator, and FormGrid
export default {
  data: {
    one: { 
      name: 'one', 
      type: 'number', 
      label: '1',
      helperText: ''
    },
    twoA: { 
      name: 'twoA', 
      type: 'select', 
      label: '2A',
      options: [
        {label: 'Option 1', value: 1},
        {label: 'Option 2', value: 2},
        {label: 'Option 3', value: 3}
      ]
    },
    twoB: { 
      name: 'twoB', 
      type: 'select', 
      label: '2B',
      isMulti: true,
      options: [
        {label: 'Option 1', value: 1},
        {label: 'Option 2', value: 2},
        {label: 'Option 3', value: 3}
      ]
    },
    threeA: {
      name: 'threeA', 
      type: 'text', 
      label: '3A',
      helperText: 'Sample text'
    },
    threeB: {
      name: 'threeB', 
      type: 'text', 
      label: '3B',
      helperText: 'Sample text'
    },
    fourA: {
      name: 'fourA', 
      type: 'text', 
      label: '4A',
      helperText: 'Sample text'
    },
    fourB: {
      name: 'fourB', 
      type: 'text', 
      label: '4B',
      helperText: 'Sample text'
    },
    fourC: {
      name: 'fourC', 
      type: 'text', 
      label: '4C',
      helperText: 'Sample text'
    }
  },
  steps: [
    {
      fields: ['one'], 
      formGrid: {x: 1, y: 1}
    },
    {
      fields: ['twoA', 'twoB'], 
      formGrid: {x: 2, y: 1},
      canSkip: true
    },
    {
      fields: ['threeA', 'threeB'], 
      formGrid: {x: 1, y: 2}
    },
    {
      fields: ['fourA', 'fourB', 'fourC'], 
      formGrid: {x: 2, y: 2}
    }
  ]
}