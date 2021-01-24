import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'recipesStore',
  initialState: {
    recipes: {}
  },
  reducers: {
    getAllRecipesDone: (state, { payload }) => {
      state.recipes = payload;
    },
    clearRecipes: state => {
      state.recipes = {};
    },
    updateRecipe: (state, { payload }) => {
      const { recipeId, recipe } = payload;
      state.recipes[recipeId] = recipe;
    },
    removeRecipeDone: (state, { payload }) => {
      const { recipeId } = payload;
      delete state.recipes[recipeId];
    }
  }
});

export const {
  getAllRecipesDone,
  clearRecipes,
  updateRecipe,
  removeRecipeDone
} = slice.actions;

export default slice.reducer;