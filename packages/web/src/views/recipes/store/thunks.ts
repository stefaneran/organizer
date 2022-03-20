// eslint-disable
import { Dispatch } from 'redux';
import { v4 } from 'uuid';
// Actions
import { setRecipes, updateRecipe, deleteRecipeDone } from '.';
import { setInventoryData } from 'inventory/store';
import { createItem } from 'inventory/store/thunks';
// Constants
import baseUrl from '@core/baseUrl';
import STATUS_CODES from '@core/constants/statusCodes';
// Utils
import sanitizeIngredients from 'recipes/utils/sanitizeIngredients';
import genericRequest from '@core/utils/genericRequest';
import genericRequestWithDispatch from '@core/utils/genericRequestWithDispatch';
// Types
import { GetState, RequestOptions } from '@core/types';
import { Recipe, RecipeEdit } from 'recipes/types';

export const getRecipes = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${baseUrl}/recipes/get`,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not get recipes"
  }
  const response = await genericRequest(
    dispatch,
    getState,
    options
  );
  dispatch(setRecipes(response.data.recipes))
  dispatch(setInventoryData(response.data))
}

// TODO - Rename to createRecipe
export const addRecipe = (recipe: RecipeEdit) => async (dispatch: Dispatch, getState: GetState) => {
  const { inventoryStore: { groceries } } = getState();
  const createGroceryThunk = async (name, category) => dispatch(createItem({ name, category }));
  const ingredientsWithId = await sanitizeIngredients(
    recipe.ingredients, 
    groceries, 
    createGroceryThunk
  );
  const recipeId = v4();
  const newRecipe = {
    ...recipe,
    ingredients: ingredientsWithId
  }
  const params = { recipeId, recipe: newRecipe };
  const options: RequestOptions = {
    url: `${baseUrl}/recipes/create`,
    params,
    acceptedStatusCode: STATUS_CODES.CREATED,
    errorMessage: "Could not create recipe"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateRecipe,
    params
  );
}

// TODO - Rename to updateRecipe
export const editRecipe = (recipe: Recipe | RecipeEdit, recipeId: string) => async (dispatch: Dispatch, getState: GetState) => {
  const { inventoryStore: { groceries } } = getState();
  const createGroceryThunk = async (name, category) => dispatch(createItem({ name, category }));
  const ingredientsWithId = await sanitizeIngredients(
    recipe.ingredients, 
    groceries, 
    createGroceryThunk
  );
  const updatedRecipe = {
    ...recipe,
    ingredients: ingredientsWithId
  }
  const params = { recipeId, recipe: updatedRecipe }
  const options: RequestOptions = {
    url: `${baseUrl}/recipes/update`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not update recipe"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateRecipe,
    params
  );
}

export const deleteRecipe = (recipeId: string) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { recipeId };
  const options: RequestOptions = {
    url: `${baseUrl}/recipes/delete`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not delete recipe"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteRecipeDone,
    params
  );
}