import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'recipesStore',
  initialState: {
    recipes: {
      '1': {
        name: 'Spaghetti',
        category: 'Main',
        nationality: 'Italian',
        instructions: `Boil water

          Put spaghetti

          Put ketchup when soft but dont forget to only do it if you really feel like it cause some people might not be into that sort of thing and thats ok, you just gotta do what you want and no one can ever make you do anything you dont really want ok sleepyhead?

          serve
        `,
        ingredients: [
          { itemId: '3', amount: '200g' }, 
          { itemId: '7', amount: '100g' }, 
          { itemId: '8', amount: 'Whichever' }
        ]
      },
      '2': {
        name: 'Apples & Ketchup',
        category: 'Entree',
        nationality: 'Kenyan',
        instructions: `Wash apples

          Spray ketchup
        `,
        ingredients: [
          { itemId: '4', amount: '3' },
          { itemId: '8', amount: '1 Table Spoon' }
        ]
      }
    }
  },
  reducers: {
    addRecipeDone: (state, { payload }) => {
      const { recipe, id } = payload;
      state.recipes[id] = recipe;
    },
    editRecipeDone: (state, { payload }) => {

    },
    removeRecipeDone: (state, { payload }) => {

    }
  }
});

export const {
  addRecipeDone,
  editRecipeDone,
  removeRecipeDone
} = slice.actions;

export default slice.reducer;