import { Dispatch } from 'redux';
import { v4 } from 'uuid';
// Actions
import {
  setInventoryData,
  setGroceryItem,
  deleteGroceryItemDone,
  addInventoryDone,
  removeInventoryDone,
  addCartDone,
  removeCartDone,
  updateCartSelectedDone,
  finishShoppingDone
} from '.';
import { updateAfterItemDelete } from 'recipes/store';
// Constants
import baseUrl from '@core/baseUrl';
import STATUS_CODES from '@core/constants/statusCodes';
// Utils
import genericRequestWithDispatch from '@core/utils/genericRequestWithDispatch';
// Types
import { GetState, RequestOptions } from '@core/types';
import { GroceryItem, GroceryItemEdit } from 'inventory/types';

export const getItems = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/get`,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not get groceries"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setInventoryData,
    {},
  );
}

export const createItem = (groceryItem: GroceryItemEdit) => async (dispatch: Dispatch, getState: GetState) => {
  const groceryId = v4();
  const params = { groceryId, groceryItem };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/create`,
    params,
    acceptedStatusCode: STATUS_CODES.CREATED,
    errorMessage: "Could not create grocery item"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setGroceryItem,
    params
  );
  // TODO - Check if we even need to return this
  return groceryId;
}

export const updateItem = (groceryId: string, groceryItem: GroceryItem) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceryId, groceryItem };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/update`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not update grocery item"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setGroceryItem,
    params
  );
  return groceryId;
}

export const deleteItems = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/delete`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not delete grocery item(s)"
  }
  const response = await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteGroceryItemDone,
    params
  );
  dispatch(updateAfterItemDelete({ ...response.data }))
}

export const addInventory = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/addInventory`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not add to inventory"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    addInventoryDone,
    params
  );
}

export const removeInventory = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/removeInventory`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not remove from inventory"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    removeInventoryDone,
    params
  );
}

export const addCart = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/addCart`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not add to cart"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    addCartDone,
    params
  );
}

export const removeCart = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/removeCart`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not remove from cart"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    removeCartDone,
    params
  );
}

export const updateCartSelected = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/updateCartSelected`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not update cart selection"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateCartSelectedDone,
    params
  );
}

export const finishShopping = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${baseUrl}/inventory/finishShopping`,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not finalize shopping"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    finishShoppingDone,
    {}
  );
}