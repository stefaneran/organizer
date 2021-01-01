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
  // TODO - Use Promise.all() and ensure it works properly
  recipe.ingredients.forEach(async ingredient => {
    const { name, amount } = ingredient;
    if (!name.length) {
      return;
    }
    let itemId = getIngredientIdByName(name, allItems);
    if (!itemId) {
      itemId = await dispatch(addToAllItems({ name, category: 'Uncategorized' }))
    }
    ingredients.push({ itemId, amount });
  });
  const recipeId = v4();
  const newRecipe = {
    ...recipe,
    ingredients
  }
  dispatch(updateRecipes({ recipe: newRecipe, recipeId }));
}

export const editRecipe = (recipe, recipeId) => async (dispatch, getState) => {
  const { inventoryStore: { allItems } } = getState();
  const ingredients = [];
  // Verify each ingredient and get its existing/newly created itemId
  // TODO - Use Promise.all() and ensure it works properly
  recipe.ingredients.forEach(async ingredient => {
    const { name, amount } = ingredient;
    if (!name.length) {
      return;
    }
    let itemId = getIngredientIdByName(name, allItems);
    if (!itemId) {
      itemId = await dispatch(addToAllItems({ name, category: 'Uncategorized' }))
    }
    ingredients.push({ itemId, amount });
  });
  const updatedRecipe = {
    ...recipe,
    ingredients
  }
  dispatch(updateRecipes({ recipe: updatedRecipe, recipeId }))
}

export const removeRecipe = (recipeId) => async (dispatch, getState) => {
  dispatch(removeRecipeDone({ recipeId }))
}