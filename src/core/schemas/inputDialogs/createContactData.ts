import { PriorityType } from "@core/interfaces/general";

export default {
  data: {
    name: {
      name: 'name', 
      type: 'text', 
      label: 'Name'
    },
    location: {
      name: 'location', 
      type: 'text', 
      label: 'Location',
      helperText: 'Country and/or City'
    },
    groups: {
      name: 'groups', 
      type: 'textMultiSelect', 
      label: 'Groups',
      helperText: 'Social groups this contact belongs to (Coworkers, Pub Friends, Sidechicks)',
      // Options will be injected in the creation dialog
      options: []
    },
    relations: {
      name: 'relations',
      type: 'textMultiSelect',
      label: 'Relationships',
      helperText: 'Contacts this new contact is related to',
      // Options will be injected in the creation dialog
      options: []
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