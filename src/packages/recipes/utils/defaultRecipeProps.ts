import { RecipeEdit } from '@recipes/types';

// Empty recipe object for creation
const defaultRecipe: Omit<RecipeEdit, "id"> = {
  name: '',
  nationality: 'Other',
  category: '',
  instructions: '',
  ingredients: [
    { 
      name: '',  // Redux uses typeId, but we use name here to allow creation of non-existent items
      amount: '', 
    }
  ]
}

export default defaultRecipe;