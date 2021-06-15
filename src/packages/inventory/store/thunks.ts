// @ts-nocheck
import {
  getAllDone,
  setItem,
  removeFromAllItemsDone,
  addToAvailableDone,
  removeFromAvailableDone,
  addToCartDone,
  removeFromCartDone,
  updateSelectedInCartDone,
  finishShoppingDone
} from '.';
import genericRequest from '@core/utils/genericRequest';
import baseUrl from '@core/baseUrl';
import { v4 } from 'uuid';

export const getAllInventory = () => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/getAll`,
    {},
    getAllDone,
    {},
    `Could not get inventory`
  );
}

export const addToAllItems = (item) => async (dispatch, getState) => {
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

export const editItem = (itemId, item) => async (dispatch, getState) => {
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

export const removeFromAllItems = (itemIds) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/inventory/deleteItem`,
    { itemIds },
    removeFromAllItemsDone,
    { itemIds },
    `Could not delete item`
  );
}

export const addToAvailable = (itemIds) => async (dispatch, getState) => {
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
export const addNewToAvailable = (item) => async (dispatch, getState) => {
  const id = await dispatch(addToAllItems(item))
  dispatch(addToAvailableDone({ itemIds: [id] }));
}

export const removeFromAvailable = (itemIds) => async (dispatch, getState) => {
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

export const addToCart = (itemIds) => async (dispatch, getState) => {
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
export const addNewToCart = (item) => async (dispatch, getState) => {
  const id = await dispatch(addToAllItems(item))
  dispatch(addToCartDone({ itemIds: [id] }));
}

export const removeFromCart = (itemIds) => async (dispatch, getState) => {
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

export const updateSelectedInCart = (selected) => async (dispatch, getState) => {
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

export const finishShopping = () => async (dispatch, getState) => {
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