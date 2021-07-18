// eslint-disable
import { Dispatch } from 'redux';
import { updateRecipe, deleteRecipeDone } from '.';
import { addToAllItems } from 'inventory/store/thunks';
import baseUrl from '@core/baseUrl';
import { v4 } from 'uuid';
import genericRequest from '@core/utils/genericRequest';
import sanitizeIngredients from 'recipes/utils/sanitizeIngredients';
import { GetState } from '@core/types';
import { Recipe, RecipeEdit } from 'recipes/types';

export const addRecipe = (recipe: RecipeEdit) => async (dispatch: Dispatch, getState: GetState) => {
  const { inventoryStore: { allItems } } = getState();
  const addThunk = async (name, category) => dispatch(addToAllItems({ name, category }));
  const ingredientsWithId = await sanitizeIngredients(
    recipe.ingredients, 
    allItems, 
    addThunk
  );
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

export const editRecipe = (recipe: Recipe | RecipeEdit, recipeId: string) => async (dispatch: Dispatch, getState: GetState) => {
  const { inventoryStore: { allItems } } = getState();
  const addThunk = async (name, category) => dispatch(addToAllItems({ name, category }));
  const ingredientsWithId = await sanitizeIngredients(
    recipe.ingredients, 
    allItems, 
    addThunk
  );
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

export const deleteRecipe = (recipeId: string) => async (dispatch: Dispatch, getState: GetState) => {
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