import { PriorityType } from "@core/interfaces/general";

export default {
  data: {
    name: {
      name: 'name', 
      type: 'text', 
      label: 'Book Title'
    },
    author: {
      name: 'author', 
      type: 'text', 
      label: 'Book Author (Optional)'
    },
    pagesTotal: {
      name: 'pagesTotal',
      type: 'number',
      label: 'Number of pages'
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
  formGrid: { x: 1, y: 4 }
}