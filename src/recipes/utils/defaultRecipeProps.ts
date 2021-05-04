// Empty recipe object for creation
export default {
  name: '',
  nationality: 'Other',
  category: '',
  instructions: '',
  // 
  ingredients: [
    { 
      name: '',  // Redux uses typeId, but we use name here to allow creation of non-existent items
      amount: '', 
    }
  ]
}