import {
  updateRecipes,
  removeRecipeDone
} from '.';
import {
  addToAllItems
} from '@inventory/store/thunks';
import {
  loadingStart,
  loadingEnd,
  updateError
} from '@store/app';
import genericRequest from '@store/utils/genericRequest';
import jsonFetch from '@store/utils/jsonFetch';
import baseUrl from '@store/baseUrl';
import { v4 } from 'uuid';
import getIngredientIdByName from '@recipes/utils/getIngredientIdByName';

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
      console.log(itemId)
      ingredients.push({ itemId, amount });
    }
  })).then(() => {
    const recipeId = v4();
    const newRecipe = {
      ...recipe,
      ingredients
    }
    dispatch(updateRecipes({ recipe: newRecipe, recipeId }));
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
    dispatch(updateRecipes({ recipe: updatedRecipe, recipeId }))
  });
}

export const removeRecipe = (recipeId) => async (dispatch, getState) => {
  dispatch(removeRecipeDone({ recipeId }))
}