import { PriorityType } from "@core/interfaces/general";

export default {
  data: {
    title: {
      name: 'title', 
      type: 'text', 
      label: 'Course Title'
    },
    description: {
      name: 'description', 
      type: 'text', 
      label: 'Description (Optional)'
    },
    classesTotal: {
      name: 'classesTotal',
      type: 'number',
      label: 'Number of classes'
    },
    hoursPerClass: {
      name: 'hoursPerClass',
      type: 'number',
      label: 'Hours per class',
      helperText: 'Default: 1 Hour'
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
    }
  },
  formGrid: { x: 1, y: 5 }
}