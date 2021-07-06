// @ts-nocheck
import {
  updateRecipe,
  deleteRecipeDone
} from '.';
import {
  addToAllItems
} from '@inventory/store/thunks';
import genericRequest from '@core/utils/genericRequest';
import baseUrl from '@core/baseUrl';
import { v4 } from 'uuid';
import sanitizeIngredients from '@recipes/utils/sanitizeIngredients';

export const addRecipe = (recipe) => async (dispatch, getState) => {
  const { inventoryStore: { allItems } } = getState();
  const ingredientsWithId = await sanitizeIngredients(recipe.ingredients, allItems, dispatch, addToAllItems);
  const newId = v4();
  const newRecipe = {
    ...recipe,
    ingredients: ingredientsWithId
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
}

export const editRecipe = (recipe, recipeId) => async (dispatch, getState) => {
  const { inventoryStore: { allItems } } = getState();
  const ingredientsWithId = await sanitizeIngredients(recipe.ingredients, allItems, dispatch, addToAllItems);
  const updatedRecipe = {
    ...recipe,
    ingredients: ingredientsWithId
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
}

export const deleteRecipe = (recipeId) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/recipes/delete`,
    { recipeId },
    deleteRecipeDone,
    { recipeId },
    `Could not remove recipe`
  );
}