import {
  getAllRecipesDone,
  updateRecipe,
  removeRecipeDone
} from '.';
import {
  addToAllItems
} from '@inventory/store/thunks';
import genericRequest from '@store/utils/genericRequest';
import baseUrl from '@store/baseUrl';
import { v4 } from 'uuid';
import getIngredientIdByName from '@recipes/utils/getIngredientIdByName';

export const getAllRecipes = () => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/recipes/getAll`,
    {},
    getAllRecipesDone,
    {},
    `Could not get all recipes`
  );
}

export const addRecipe = (recipe) => async (dispatch, getState) => {
  const { inventoryStore: { allItems } } = getState();
  const ingredients = [];
  // Verify each ingredient and get its existing/newly created itemId
  Promise.all(recipe.ingredients.map(async ingredient => {
    const { name, amount } = ingredient;
    if (name.length) {
      let itemId = getIngredientIdByName(name, allItems);
      if (!itemId) {
        itemId = await dispatch(addToAllItems({ name, category: 'Uncategorized' }))
      }
      ingredients.push({ itemId, amount });
    }
  })).then(() => {
    const newId = v4();
    const newRecipe = {
      ...recipe,
      ingredients
    }
    genericRequest(
      dispatch,
      getState,
      `${baseUrl}/recipes/add`,
      { newId, recipe: newRecipe },
      updateRecipe,
      { recipeId: newId, recipe: newRecipe, },
      `Could not add recipe`
    );
  });
}

export const editRecipe = (recipe, recipeId) => async (dispatch, getState) => {
  const { inventoryStore: { allItems } } = getState();
  const ingredients = [];
  // Verify each ingredient and get its existing/newly created itemId
  Promise.all(recipe.ingredients.map(async ingredient => {
    const { name, amount } = ingredient;
    if (name.length) {
      let itemId = getIngredientIdByName(name, allItems);
      if (!itemId) {
        itemId = await dispatch(addToAllItems({ name, category: 'Uncategorized' }))
      }
      ingredients.push({ itemId, amount });
    }
  })).then(() => {
    const updatedRecipe = {
      ...recipe,
      ingredients
    }
    genericRequest(
      dispatch,
      getState,
      `${baseUrl}/recipes/edit`,
      { recipeId, recipe: updatedRecipe },
      updateRecipe,
      { recipeId, recipe: updatedRecipe, },
      `Could not edit recipe`
    );
  });
}

export const removeRecipe = (recipeId) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/recipes/delete`,
    { recipeId },
    removeRecipeDone,
    { recipeId },
    `Could not remove recipe`
  );
}