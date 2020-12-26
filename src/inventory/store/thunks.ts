import {
  getAllItemsDone,
  addToAllItemsDone,
  removeFromAllItemsDone,
  getAvailableDone,
  addToAvailableDone,
  removeFromAvailableDone,
  getCartDone,
  addToCartDone,
  removeFromCartDone,
  updateSelectedInCartDone,
  finishShoppingDone
} from '.';
import {
  loadingStart,
  loadingEnd,
  updateError
} from '@store/app';
import genericRequest from '@store/utils/genericRequest';
import jsonFetch from '@store/utils/jsonFetch';
import baseUrl from '@store/baseUrl';
import { v4 } from 'uuid';

export const getAllItems = () => async (dispatch, getState) => {
  dispatch(getAllItemsDone({}))
}

export const addToAllItems = (item) => async (dispatch, getState) => {
  const id = v4();
  dispatch(addToAllItemsDone({ id, item }))
  return id;
}

export const removeFromAllItems = (id) => async (dispatch, getState) => {
  dispatch(removeFromAllItemsDone({ id }))
}

export const getAvailable = () => async (dispatch, getState) => {
  dispatch(getAvailableDone([]))
}

export const addToAvailable = (itemIds) => async (dispatch, getState) => {
  dispatch(addToAvailableDone({ itemIds }));
}

export const addNewToAvailable = (item) => async (dispatch, getState) => {
  const id = await dispatch(addToAllItems(item))
  dispatch(addToAvailableDone({ itemIds: [id] }));
}

export const removeFromAvailable = (id) => async (dispatch, getState) => {
  dispatch(removeFromAvailableDone({ id }))
}

export const getCart = () => async (dispatch, getState) => {
  dispatch(getCartDone([]))
}

export const addToCart = (itemIds) => async (dispatch, getState) => {
  dispatch(addToCartDone({ itemIds }));
}

export const addNewToCart = (item) => async (dispatch, getState) => {
  const id = await dispatch(addToAllItems(item))
  dispatch(addToCartDone({ itemIds: [id] }));
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeFromCartDone({ id }))
}

export const updateSelectedInCart = (selected) => async (dispatch, getState) => {
  dispatch(updateSelectedInCartDone({ selected }))
}

export const finishShopping = (selected) => async (dispatch, getState) => {
  dispatch(finishShoppingDone());
}