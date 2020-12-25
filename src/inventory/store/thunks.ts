import {
  getAllItemsDone,
  addToAllItemsDone,
  removeFromAllItemsDone,
  getAvailableDone,
  addToAvailableDone,
  removeFromAvailableDone,
  getCartDone,
  addToCartDone,
  removeFromCartDone
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

export const addToAvailable = ({ id, item }) => async (dispatch, getState) => {
  let newId = id;
  if (!id) {
    newId = await dispatch(addToAllItems(item));
  }
  dispatch(addToAvailableDone({ id: newId }));
}

export const removeFromAvailable = (id) => async (dispatch, getState) => {
  dispatch(removeFromAvailableDone({ id }))
}

export const getCart = () => async (dispatch, getState) => {
  dispatch(getCartDone([]))
}

export const addToCart = ({ id, item }) => async (dispatch, getState) => {
  let newId = id;
  if (!id) {
    newId = await dispatch(addToAllItems(item));
  }
  dispatch(addToCartDone({ id: newId }));
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeFromCartDone({ id }))
}