// @ts-nocheck
import { Dispatch } from 'redux';
import {
  setItem,
  removeFromAllItemsDone,
  addToAvailableDone,
  removeFromAvailableDone,
  addToCartDone,
  removeFromCartDone,
  updateSelectedInCartDone,
  finishShoppingDone
} from '.';
import { updateAfterItemDelete } from 'recipes/store';
import baseUrl from 'core/baseUrl';
import { v4 } from 'uuid';
import genericRequest from 'core/utils/genericRequest';
import { GetState } from 'core/types';
import { InventoryItem } from 'inventory/types';

export const addToAllItems = (item: InventoryItem) => async (dispatch: Dispatch, getState: GetState) => {
  const itemId = v4();
  await genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/setItem`,
    { itemId, item },
    setItem,
    { itemId, item },
    `Could not create item`
  );
  return itemId;
}

export const editItem = (itemId: string, item: InventoryItem) => async (dispatch: Dispatch, getState: GetState) => {
  await genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/setItem`,
    { itemId, item },
    setItem,
    { itemId, item },
    `Could not edit item`
  );
  return itemId;
}

export const removeFromAllItems = (itemIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const response = await genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/deleteItem`,
    { itemIds },
    removeFromAllItemsDone,
    { itemIds },
    `Could not delete item`
  );
  dispatch(updateAfterItemDelete({ ...response.data }))
}

export const addToAvailable = (itemIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/addAvailable`,
    { itemIds },
    addToAvailableDone,
    { itemIds },
    `Could not add to inventory`
  );
}

// TODO - USE THIS
export const addNewToAvailable = (item: InventoryItem) => async (dispatch: Dispatch, getState: GetState) => {
  const id = await dispatch(addToAllItems(item))
  dispatch(addToAvailableDone({ itemIds: [id] }));
}

export const removeFromAvailable = (itemIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/removeAvailable`,
    { itemIds },
    removeFromAvailableDone,
    { itemIds },
    `Could not remove from inventory`
  );
}

export const addToCart = (itemIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/addCart`,
    { itemIds },
    addToCartDone,
    { itemIds },
    `Could not add to cart`
  );
}

// TODO - USE THIS
export const addNewToCart = (item: InventoryItem) => async (dispatch: Dispatch, getState: GetState) => {
  const id = await dispatch(addToAllItems(item))
  dispatch(addToCartDone({ itemIds: [id] }));
}

export const removeFromCart = (itemIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/removeCart`,
    { itemIds },
    removeFromCartDone,
    { itemIds },
    `Could not remove from cart`
  );
}

export const updateSelectedInCart = (selected: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/updateSelectedCart`,
    { selected },
    updateSelectedInCartDone,
    { selected },
    `Could not update cart selection`
  );
}

export const finishShopping = () => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/finishShopping`,
    {},
    finishShoppingDone,
    {},
    `Could not finalize shopping`
  );
}